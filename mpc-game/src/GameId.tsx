import {Formik, Form} from "formik";
import {pokemonData} from "./lib/data";
import {Card, CardContent} from "./components/ui/card";
import {useState} from "react";
import {Button} from "./components/ui/button";
import {useParams} from "react-router-dom";
import useGlobalContext from "./context/useGlobalContext";
import AsyncQueue from "./mpc-hello/src/AsyncQueue";

export default function GameId() {
  const [selectedPokemon, setSelectedPokemon] = useState<number | null>(null);
  const params = useParams();
  const {app} = useGlobalContext();

  const check = () => {
    console.log(app, "check");
  };

  return (
    <div className="h-screen w-full p-4">
      <div className="w-full h-[100px]">
        <h1 className="text-3xl font-semibold flex justify-center items-center">
          Room Id: &nbsp;<span className="font-normal">{params.gameId}</span>
        </h1>
      </div>
      <Formik
        initialValues={{pokemonId: 0}}
        onSubmit={(values) => {
          console.log(pokemonData[values.pokemonId - 1]);
          (async function () {
            const ans = await app.mpcLargest(
              pokemonData[values.pokemonId - 1].hp
            );
            console.log(ans, "ans");

            app.msgQueue = new AsyncQueue<unknown>();
          })();
        }}
      >
        {({errors, touched, setFieldValue}) => (
          <Form className="w-full h-full flex justify-start items-center flex-col">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-10">
              {pokemonData.map((_, index) => (
                <Card
                  className={`w-full cursor-pointer transition-all ${
                    selectedPokemon === index + 1
                      ? "ring-2 ring-primary"
                      : "hover:ring-2 hover:ring-primary/50"
                  }`}
                  onClick={() => {
                    setFieldValue("pokemonId", index + 1);
                    setSelectedPokemon(index + 1);
                  }}
                  key={index}
                >
                  <CardContent className="p-6">
                    <div className="text-center">
                      <img
                        src={pokemonData[index].image}
                        alt={pokemonData[index].name}
                        className="w-32 h-32 mx-auto mb-4"
                      />
                      <h2 className="text-xl font-bold mb-2">
                        {pokemonData[index].name}
                      </h2>
                      <p className="text-sm text-muted-foreground mb-2">
                        Type: {pokemonData[index].type}
                      </p>
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div>
                          <p className="font-bold">HP</p>
                          <p>{pokemonData[index].hp}</p>
                        </div>
                        <div>
                          <p className="font-bold">Attack</p>
                          <p>{pokemonData[index].attack}</p>
                        </div>
                        <div>
                          <p className="font-bold">Defense</p>
                          <p>{pokemonData[index].defense}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Submit Button */}
            <div className="px-10 mt-4">
              <Button type="submit" className="w-full">
                Confirm Pokemon Selection
              </Button>
            </div>

            {/* Error Display */}
            {errors.pokemonId && touched.pokemonId && (
              <div className="text-red-500 text-center mt-2">
                {errors.pokemonId}
              </div>
            )}
          </Form>
        )}
      </Formik>

      <Button onClick={check}>Check</Button>

      {/* <div className="h-screen w-full bg-yellow-100 py-4">
        <div className="h-[400px] w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-10">
            <Card
              className={`w-full cursor-pointer transition-all "hover:ring-2 hover:ring-primary/50 flex items-center justify-center`}
              onClick={() => {
                // setFieldValue("pokemonId", index + 1);
                // setSelectedPokemon(index + 1);
                // createRoomFunc();
              }}
            >
              <CardContent className="p-6">
                <div className="text-center m-auto">
                  <Plus className="w-28 h-28 font-light mx-auto mb-4" />
                  <h2 className="text-xl font-bold mb-2">{`Create a Room`}</h2>
                  <p className="text-sm text-muted-foreground mb-2">
                      Type: {pokemonData[index].type}
                    </p> 
                </div>
              </CardContent>
            </Card>
            {pokemonData.map((pokemon, index) => (
              <Card
                className={`w-full cursor-pointer transition-all "hover:ring-2 hover:ring-primary/50`}
                onClick={() => {
                  // setFieldValue("pokemonId", index + 1);
                  // setSelectedPokemon(index + 1);
                }}
                key={index}
              >
                <CardContent className="p-6">
                  <div className="text-center">
                    <img
                      src={pokemonData[index].image}
                      alt={pokemonData[index].name}
                      className="w-32 h-32 mx-auto mb-4"
                    />
                    <h2 className="text-xl font-bold mb-2">
                      {`Room ${index + 1}`}
                    </h2>
                    <p className="text-sm text-muted-foreground mb-2">
                      Type: {pokemonData[index].type}
                    </p> 
                    <div className="flex items-centerc justify-center">
                      <div className="rounded-3xl w-[90px] h-[30px] border-2"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div> */}
    </div>
  );
}
