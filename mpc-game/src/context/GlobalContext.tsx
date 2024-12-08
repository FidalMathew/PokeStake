/* eslint-disable @typescript-eslint/no-explicit-any */
import App from "@/mpc-hello/src/App";
import { createContext, ReactNode, useState } from "react";
import {
  useOkto,
  type OktoContextType,
  type User,
  type Portfolio,
  WalletData,
} from "okto-sdk-react";
import { ethers } from "ethers";
import abi from "../lib/abi.json";
interface GlobalContextProps {
  app: any;
  createGame: (stakeAmount: any, meetingId: number) => Promise<void>;
  endGame: (matchId: number, _winner: `0x${string}`) => Promise<void>;
  getAllMatches: () => Promise<void>;
  getStakeAmountByMatchId: (matchId: any) => Promise<void>;
  joinGame: (from: any, stakeAmount: any, matchId: any) => Promise<void>;
  getWalletsForUser: () => Promise<undefined | WalletData>;
  getBalance: () => Promise<void>;
}

const app = new App();

// pnpm i

export const GlobalContext = createContext<GlobalContextProps>({
  app: app,
  createGame: async () => {},
  endGame: async () => {},
  getAllMatches: async () => {},
  getStakeAmountByMatchId: async () => {},
  joinGame: async () => {},
  getWalletsForUser: async () => "",
  getBalance: async () => {},
});

export default function GlobalContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { getPortfolio } = useOkto() as OktoContextType;
  const { executeRawTransaction, getRawTransactionStatus } =
    useOkto() as OktoContextType;
  const { readContractData } = useOkto() as OktoContextType;
  const { getWallets } = useOkto() as OktoContextType;

  const networkName = "POLYGON_TESTNET_AMOY";
  const contractAddress = "0xF805642EfCC637e1665585dF12370b4Cc437E6df";

  const iface = new ethers.Interface(abi);

  const getAllMatches = async () => {
    try {
      // Call readContractData and wait for the result
      const contractData = {
        contractAddress: contractAddress,
        abi: abi[7],
        args: undefined,
      };
      const result = await readContractData(networkName, contractData);

      // Log the result
      console.log("Contract data:", result);

      // Return the result if needed
      return result;
    } catch (error) {
      // Handle errors and log them
      console.error("Error reading contract:", error);
      throw error; // Optionally re-throw the error to handle it upstream
    }
  };

  const getStakeAmountByMatchId = async (matchId: any) => {
    try {
      // Call readContractData and wait for the result
      const contractData = {
        contractAddress: contractAddress,
        abi: abi[10],
        args: [matchId],
      };
      const result = await readContractData(networkName, contractData);

      // Log the result
      console.log("Contract data:", result);

      // Return the result if needed
      return result;
    } catch (error) {
      // Handle errors and log them
      console.error("Error reading contract:", error);
      throw error; // Optionally re-throw the error to handle it upstream
    }
  };
  const joinGame = async (from: any, stakeAmount: any, matchId: any) => {
    try {
      // Define the transaction data
      const transactionData = {
        from: from,
        to: contractAddress,
        data: iface.encodeFunctionData("joinGame", [matchId]),
        value: ethers.parseEther(stakeAmount.toString()), // Ensure stakeAmount is a string or valid number
      };

      // Execute the raw transaction
      const result = await executeRawTransaction({
        network_name: networkName, // Ensure `networkName` is defined in your scope
        transaction: transactionData,
      });

      console.log("Transaction submitted", result);

      // Check the transaction status
      const status = await getRawTransactionStatus({
        order_id: result.jobId,
      });

      console.log("Transaction status:", status);
    } catch (error) {
      console.error("Transaction error", error);
    }
  };

  const getWalletsForUser = async () => {
    try {
      console.log("getWalletsForUser");

      const res = await getWallets();
      console.log(res, "aryan");

      return res;
    } catch (error) {
      console.error("Error fetching wallets:", error);
    }
  };

  const getBalance = async () => {
    getPortfolio()
      .then((result: any) => {
        console.log(result);
      })
      .catch((error: any) => {
        console.error(`error:`, error);
      });
  };

  // Example state
  const provider = new ethers.JsonRpcProvider(
    "https://polygon-amoy-bor-rpc.publicnode.com"
  );

  // 2. Wallet setup using your private key
  const privateKey = import.meta.env.VITE_PRIVATE_KEY as string;
  const wallet = new ethers.Wallet(privateKey, provider);

  // 3. Contract setup

  const contract = new ethers.Contract(contractAddress, abi, wallet);

  const createGame = async (stakeAmount: string, meetingId: Number) => {
    try {
      console.log("dsadsadsadsdasdasdasdsadasdsady8asudo8yas89dy8oa");
      // convert stakeAmt to wei
      const stakeAmt = ethers.parseEther(stakeAmount.toString());

      console.log(stakeAmt, "stakeAmt");

      const res = await contract.createGame(stakeAmt, meetingId);
      console.log(res);

      await res.wait();
    } catch (error) {
      console.log(error);
    }
  };

  const endGame = async (matchId: number, _winner: `0x${string}`) => {
    try {
      const res = await contract.endGame(matchId, _winner);
      console.log(res);

      await res.wait();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        app,
        createGame,
        endGame,
        getAllMatches,
        getStakeAmountByMatchId,
        joinGame,
        getWalletsForUser,
        getBalance,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
