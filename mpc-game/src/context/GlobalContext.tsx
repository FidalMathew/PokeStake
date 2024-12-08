/* eslint-disable @typescript-eslint/no-explicit-any */
import App from "@/mpc-hello/src/App";
import { createContext, ReactNode, useState } from "react";
import { useOkto, type OktoContextType, type User, type Portfolio } from "okto-sdk-react";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { ethers } from "ethers";
import abi from "../lib/abi.json";
;

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
  const [someValue, setSomeValue] = useState("defaultValue");
  const { authenticate, createWallet } = useOkto()!;
  const { getPortfolio } = useOkto() as OktoContextType;
  const { executeRawTransaction, getRawTransactionStatus } = useOkto() as OktoContextType;
  const { readContractData } = useOkto() as OktoContextType;
  const { getWallets } = useOkto() as OktoContextType;

  const [authToken, setAuthToken] = useState<string | null>(null);

  const networkName = "POLYGON_TESTNET_AMOY";
  const contractAddress = "0xF805642EfCC637e1665585dF12370b4Cc437E6df";

  const handleGoogleLogin = async (credentialResponse: CredentialResponse) => {
    const idToken = credentialResponse.credential;
    authenticate(idToken!, (authResponse: { auth_token: string } | null, error: any) => {
      if (authResponse) {
        setAuthToken(authResponse.auth_token);
        console.log("Authenticated successfully, auth token:", authResponse.auth_token);
      } else if (error) {
        console.error("Authentication error:", error);
      }
    });
  };

  const iface = new ethers.Interface(abi)

  const getAllMatches = async () => {
    try {
      // Call readContractData and wait for the result
      const contractData = {
        contractAddress: contractAddress,
        abi: abi[7],
        args: undefined,
      }
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
      }
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
  }
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
    getWallets()
      .then((result: any) => {
        console.log('Wallets:', result);
      }
      )
      .catch((error: any) => {
        console.log('Error reading contract:', error);
      });
  }

  const getBalance = async () => {
    getPortfolio()
      .then((result: any) => {
        console.log(result)
      })
      .catch((error: any) => {
        console.error(`error:`, error);
      });
  }



  // Example state
  const provider = new ethers.JsonRpcProvider(
    "https://polygon-amoy-bor-rpc.publicnode.com"
  );

  // 2. Wallet setup using your private key
  const privateKey = import.meta.env.VITE_PRIVATE_KEY as string;
  const wallet = new ethers.Wallet(privateKey, provider);

  // 3. Contract setup

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


