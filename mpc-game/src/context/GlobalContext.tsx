/* eslint-disable @typescript-eslint/no-explicit-any */
import App from "@/mpc-hello/src/App";
import { createContext, ReactNode } from "react";
import { ethers } from "ethers";

import abi from "@/lib/abi.json";

interface GlobalContextProps {
  app: any;
  createGame: () => Promise<void>;
  endGame: () => Promise<void>;
}

const app = new App();

// pnpm i

export const GlobalContext = createContext<GlobalContextProps>({
  app: app,
  createGame: async () => {},
  endGame: async () => {},
});

export default function GlobalContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const provider = new ethers.JsonRpcProvider(
    "https://polygon-amoy-bor-rpc.publicnode.com"
  );

  // 2. Wallet setup using your private key
  const privateKey = import.meta.env.VITE_PRIVATE_KEY as string;
  const wallet = new ethers.Wallet(privateKey, provider);

  // 3. Contract setup

  const contractAddress = "YOUR_CONTRACT_ADDRESS";
  const contract = new ethers.Contract(contractAddress, abi, wallet);

  const createGame = async () => {
    try {
      const res = await contract.createGame();
      console.log(res);

      await res.wait();
    } catch (error) {
      console.log(error);
    }
  };

  const endGame = async () => {
    try {
      const res = await contract.endGame();
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
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
