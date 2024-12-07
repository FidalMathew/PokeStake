/* eslint-disable @typescript-eslint/no-unused-vars */
import {Card, CardContent} from "./components/ui/card";
import {ArrowRight, Plus} from "lucide-react";
import {pokemonData} from "./lib/data";
import {Field, Form, Formik} from "formik";
import {Button} from "./components/ui/button";
import App from "./mpc-hello/src/App";
import {useNavigate} from "react-router-dom";
export default function Game() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="h-screen w-full py-4">
        <div className="h-full w-full flex justify-center items-center">
          <div className="flex items-center justify-center flex-col lg:flex-row  gap-6 px-10 w-full">
            <Card
              className={`w-full cursor-pointer transition-all "hover:ring-2 hover:ring-primary/50 flex items-center justify-center`}
              onClick={() => {
                // setFieldValue("pokemonId", index + 1);
                // setSelectedPokemon(index + 1);
                // createRoomFunc();

                const code = App.generateJoiningCode();

                navigate(`/game/${code}`);
              }}
            >
              <CardContent className="p-6">
                <div className="text-center m-auto">
                  <Plus className="w-28 h-28 font-light mx-auto mb-4" />
                  <h2 className="text-xl font-bold mb-2">{`Create a Room`}</h2>
                  {/* <p className="text-sm text-muted-foreground mb-2">
                      Type: {pokemonData[index].type}
                    </p> */}
                </div>
              </CardContent>
            </Card>

            <Card
              className={`w-full cursor-pointer transition-all "hover:ring-2 hover:ring-primary/50 flex items-center justify-center h-full`}
              onClick={() => {
                // setFieldValue("pokemonId", index + 1);
                // setSelectedPokemon(index + 1);
                // createRoomFunc();
              }}
            >
              <CardContent className="p-6 w-full h-full">
                <div className="text-center flex justify-center items-center gap-7 flex-col">
                  <Formik initialValues={{roomId: ""}} onSubmit={() => {}}>
                    {(_formik) => (
                      <Form className="w-full">
                        <div className="flex items-center gap-4">
                          <Field
                            name="roomId"
                            type="text"
                            placeholder="Room ID"
                            className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
                            id="roomId"
                          />

                          <Button
                            size={"icon"}
                            type="submit"
                            className="w-12 h-10"
                          >
                            <ArrowRight />
                          </Button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                  <p className="text-xl font-bold mb-2">{`Join a Room`}</p>
                  {/* <p className="text-sm text-muted-foreground mb-2">
                      Type: {pokemonData[index].type}
                    </p> */}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
