/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import {ArrowRight, LogIn, Plus, PlusCircle} from "lucide-react";
import {pokemonData} from "./lib/data";
import {Field, Form, Formik} from "formik";
import {Button} from "./components/ui/button";
import App from "./mpc-hello/src/App";
import {useNavigate} from "react-router-dom";
import {Input} from "./components/ui/input";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {useState} from "react";
import {Label} from "./components/ui/label";
import useGlobalContext from "./context/useGlobalContext";

export default function Game() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const {app} = useGlobalContext();

  const check = () => {
    console.log(app, "check");
  };

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Stake amount to play</DialogTitle>
            <DialogDescription>
              <Formik
                initialValues={{stakeAmount: 0}}
                onSubmit={(values) => {
                  console.log(values);
                  (async function () {
                    const code = App.generateJoiningCode();
                    console.log(code, "code");
                    await app.connect(code, "alice");
                    navigate(`/game/${code}`);
                  })();
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
        <Button onClick={check}>Check</Button>
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
            initialValues={{roomCode: ""}}
            onSubmit={(values, _) => {
              (async function () {
                console.log(values);
                await app.connect(values.roomCode, "bob");
                navigate(`/game/${values.roomCode}`);
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
