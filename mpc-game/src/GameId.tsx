import {Formik, Form} from "formik";
import {pokemonData} from "./lib/data";
import {Card, CardContent} from "./components/ui/card";
import {useState} from "react";
import {Button} from "./components/ui/button";

export default function GameId() {
  const [selectedPokemon, setSelectedPokemon] = useState<number | null>(null);

  return (
    <div className="h-screen w-full p-4">
      <div className="w-full h-[100px]">
        <h1 className="text-3xl font-semibold flex justify-center items-center">
          Room Id
        </h1>
      </div>
      <Formik
        initialValues={{pokemonId: 0}}
        onSubmit={(values) => {
          console.log(pokemonData[values.pokemonId - 1]);
        }}
      >
        {({errors, touched, setFieldValue}) => (
          <Form className="w-full h-full flex justify-start items-center flex-col">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-10">
              {pokemonData.map((pokemon, index) => (
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
