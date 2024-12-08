/* eslint-disable @typescript-eslint/no-explicit-any */
import App from "@/mpc-hello/src/App";
import { createContext, ReactNode, useState } from "react";
import { useOkto, type OktoContextType, type User, type Portfolio } from "okto-sdk-react";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { ethers } from "ethers";
import abi from "../lib/abi.json";


interface GlobalContextProps {
  someValue: string; // Define the data or state to share via context
  setSomeValue: (value: string) => void; // Define the function to update the state
  app: any;
}

const app = new App();

export const GlobalContext = createContext<GlobalContextProps>({
  someValue: "defaultValue",
  setSomeValue: () => { },
  app: app,
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

  //     const readContractDataRemix=async () => {
  //       const contractData = {
  //           contractAddress: "0x035fC6B858592D6D6F8450932F53b7Ba1E98779a",
  //           abi: abi[1],
  //           args: undefined,
  //       }
  //       readContractData(networkName, contractData)
  //         .then((result: any) => {
  //             console.log('Contract data:', result);
  //         })
  //         .catch((error: any) => {
  //             console.log('Error reading contract:', error);
  //         });
  // }

  const getAllMatches = async () => {
    try {
      // Call readContractData and wait for the result
      const contractData = {
        contractAddress: "0xF805642EfCC637e1665585dF12370b4Cc437E6df",
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
        contractAddress: "0xF805642EfCC637e1665585dF12370b4Cc437E6df",
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
        to: "0xF805642EfCC637e1665585dF12370b4Cc437E6df",
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

  return (
    <GlobalContext.Provider
      value={{
        someValue,
        setSomeValue,
        app,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}


