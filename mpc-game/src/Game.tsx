/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { ArrowRight, LogIn, Plus, PlusCircle } from "lucide-react";
import { pokemonData } from "./lib/data";
import { Field, Form, Formik } from "formik";
import { Button } from "./components/ui/button";
import App from "./mpc-hello/src/App";
import { useNavigate } from "react-router-dom";
import { Input } from "./components/ui/input";
import abi from "./lib/abi.json";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Label } from "./components/ui/label";
import useGlobalContext from "./context/useGlobalContext";
import { OktoContextType, useOkto, WalletData } from "okto-sdk-react";
import { ethers } from "ethers";

export default function Game() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  // const { app, createGame, joinGame, getWalletsForUser, getAllMatches } =
  //   useGlobalContext();

  // const getWallet = async () => {
  //   try {
  //     console.log("dsadsasdasdasddsaasdsdsa");

  //     const res: any = await getWalletsForUser(); // Assume this returns an array of wallets
  //     console.log(res, "res");
  //     // Find the wallet with the desired network_name
  //     const targetWallet = res.find(
  //       (wallet: { network_name: string }) =>
  //         wallet.network_name === "POLYGON_TESTNET_AMOY"
  //     );

  //     // Extract the address if the wallet exists
  //     if (targetWallet) {
  //       console.log("Address:", targetWallet.address);
  //       return targetWallet.address;
  //     } else {
  //       console.log("No wallet found for POLYGON_TESTNET_AMOY");
  //       return null;
  //     }
  //   } catch (error) {
  //     console.error("Error fetching wallets:", error);
  //     throw error;
  //   }
  // };

  // const getTotalMatches = async () => {
  //   try {
  //     const res: any = await getAllMatches();
  //     console.log(res);

  //     return res.length;
  //   } catch (error) {
  //     console.error("Error fetching matches:", error);
  //     throw error;
  //   }
  // };

  // const check = () => {
  //   console.log(app, "check");
  // };

  const getWallet = async () => {
    try {
      const res = await getWalletsForUser(); // Assume this returns an array of wallets
      console.log(res);

      // Find the wallet with the desired network_name
      const targetWallet = res?.wallets?.find(
        (wallet) => wallet.network_name === "POLYGON_TESTNET_AMOY"
      );

      // Extract the address if the wallet exists
      if (targetWallet) {
        console.log("Address:", targetWallet.address);
        return targetWallet.address;
      } else {
        console.log("No wallet found for POLYGON_TESTNET_AMOY");
        return null;
      }
    } catch (error) {
      console.error("Error fetching wallets:", error);
      throw error;
    }
  };

  // Example state
  const provider = new ethers.JsonRpcProvider(
    "https://polygon-amoy-bor-rpc.publicnode.com"
  );

  // 2. Wallet setup using your private key
  const privateKey = import.meta.env.VITE_PRIVATE_KEY as string;
  const wallet = new ethers.Wallet(privateKey, provider);
  const networkName = "POLYGON_TESTNET_AMOY";
  const contractAddress = "0xF805642EfCC637e1665585dF12370b4Cc437E6df";
  // 3. Contract setup

  const { getPortfolio } = useOkto() as OktoContextType;
  const { executeRawTransaction, getRawTransactionStatus } =
    useOkto() as OktoContextType;
  const { readContractData } = useOkto() as OktoContextType;
  const { getWallets } = useOkto() as OktoContextType;

  const contract = new ethers.Contract(contractAddress, abi, wallet);

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
        value: `0x${ethers.parseEther(stakeAmount.toString())}`, // Ensure stakeAmount is a string or valid number
      };

      console.log(transactionData, "transactionData");

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

  const joinGameEthers = async (from: any, stakeAmount: any, matchId: any) => {
    const stakeAmt = ethers.parseEther(stakeAmount.toString());
    console.log(stakeAmt, "stakeAmt");

    const res = await contract.joinGame(matchId, {
      value: stakeAmt,
    });

    console.log(res);
    await res.wait();
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
    <div className="h-screen w-full flex justify-center items-center">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Stake amount to play</DialogTitle>
            <DialogDescription>
              <Formik
                initialValues={{ stakeAmount: 0 }}
                onSubmit={async (values) => {
                  console.log(values);
                  // console.log(app, "app");
                  createGame(values.stakeAmount.toString(), 1);

                  // getWalletsForUser();
                  const walletAddress = await getWallet();

                  // const res = await getAllMatches();
                  // console.log(res, "res");
                  // await joinGame(
                  //   walletAddress,
                  //   values.stakeAmount.toString(),
                  //   res.length
                  // );
                  joinGameEthers(
                    walletAddress,
                    values.stakeAmount.toString(),
                    1
                  );

                  // (async function () {
                  //   const code = App.generateJoiningCode();
                  //   console.log(code, "code");
                  //   await app.connect(code, "alice");
                  //   navigate(`/game/${code}`);
                  // })();
                }}
              >
                {(formik) => (
                  <Form>
                    <div className="my-5 flex flex-col gap-2">
                      <Label htmlFor="stakeAmount">Stake Amount</Label>
                      <Field
                        as={Input}
                        name="stakeAmount"
                        type="number"
                        placeholder="Enter stake amount"
                        className="w-full focus-visible:ring-0"
                        id="stakeAmount"
                      />
                    </div>

                    <Button type="submit" variant="outline" className="w-full">
                      <span>Proceed</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Form>
                )}
              </Formik>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <div className="flex flex-col md:flex-row gap-6 items-stretch max-w-3xl mx-auto p-6">
        {/* <Button onClick={check}>Check</Button> */}
        <Card className="flex-1">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Create a Gaming Room
            </CardTitle>
            <CardDescription>
              Start a new gaming session and invite your friends
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Create a unique room for your gaming session. You'll receive a
              code to share with your friends.
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={() => setOpen(true)}>
              <PlusCircle className="mr-2 h-4 w-4" /> Stake and Create Room
            </Button>
          </CardFooter>
        </Card>

        <Card className="flex-1">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Join a Gaming Room
            </CardTitle>
            <CardDescription>
              Enter a room code to join an existing session
            </CardDescription>
          </CardHeader>
          <Formik
            initialValues={{ roomCode: "" }}
            onSubmit={(values, _) => {
              (async function () {
                // console.log(values);
                // await app.connect(values.roomCode, "bob");
                // navigate(`/game/${values.roomCode}`);
              })();
            }}
          >
            {(formik) => (
              <Form>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Have a room code? Enter it below to join your friends'
                    gaming session.
                  </p>
                  <Field
                    as={Input}
                    placeholder="Enter room code"
                    className="mb-4"
                    name="roomCode"
                    id="roomCode"
                  />
                </CardContent>
                <CardFooter>
                  <Button className="w-full" type="submit">
                    <LogIn className="mr-2 h-4 w-4" /> Join Room
                  </Button>
                </CardFooter>
              </Form>
            )}
          </Formik>
        </Card>
      </div>
    </div>
  );
}
