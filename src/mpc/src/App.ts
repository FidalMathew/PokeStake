import { RtcPairSocket } from 'rtc-pair-socket';
import AsyncQueue from './AsyncQueue';
import assert from './assert';
import generateProtocol from './generateProtocol';

export default class App {
  socket?: RtcPairSocket;
  party?: 'alice' | 'bob';
  msgQueue = new AsyncQueue<unknown>();

  static generateJoiningCode() {
    // 128 bits of entropy
    return [
      Math.random().toString(36).substring(2, 12),
      Math.random().toString(36).substring(2, 12),
      Math.random().toString(36).substring(2, 7),
    ].join('');
  }

  async connect(code: string, party: 'alice' | 'bob') {
    this.party = party;
    const socket = new RtcPairSocket(code, party);
    this.socket = socket;

    socket.on('message', (msg: unknown) => {
      // Using a message queue instead of passing messages directly to the MPC
      // protocol ensures that we don't miss anything sent before we begin.
      this.msgQueue.push(msg);
    });

    await new Promise<void>((resolve, reject) => {
      socket.on('open', resolve);
      socket.on('error', reject);
    });
  }

  async mpcLargestMultiInput(n: number): Promise<number[]> {
    const { party, socket } = this;

    assert(party !== undefined, 'Party must be set');
    assert(socket !== undefined, 'Socket must be set');

    const otherParty = party === 'alice' ? 'bob' : 'alice';
    const results: number[] = [];

    // Run the protocol n times
    for (let round = 0; round < n; round++) {
      // Determine who inputs in this round
      const inputParty = round % 2 === 0 ? 'alice' : 'bob';

      // Only create input if it's this party's turn
      const input = inputParty === party
        ? { [inputParty === 'alice' ? 'a' : 'b']: await this.getInput(round) }
        : {};

      const protocol = await generateProtocol();

      const session = protocol.join(
        party,
        input,
        (to, msg) => {
          assert(to === otherParty, 'Unexpected party');
          socket.send(msg);
        },
      );

      this.msgQueue.stream((msg: unknown) => {
        if (!(msg instanceof Uint8Array)) {
          throw new Error('Unexpected message type');
        }

        session.handleMessage(otherParty, msg);
      });

      const output = await session.output();

      if (
        output === null
        || typeof output !== 'object'
        || typeof output.main !== 'number'
      ) {
        throw new Error('Unexpected output');
      }

      results.push(output.main);
    }

    return results;
  }

  // Abstract method to get input - to be implemented by user
  async getInput(round: number): Promise<number> {
    throw new Error('getInput method must be implemented');
  }
}

// Example usage:
// class ConcreteApp extends App {
//   async getInput(round: number): Promise<number> {
//     // Implement your input gathering logic here
//     // For example, you might use readline, prompt, or some other input method
//     console.log(`Round ${round}: Please enter your number`);
//     // Return the input number
//   }
// }