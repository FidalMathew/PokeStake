"use client";
import {pokemonData} from "@/lib/data";
import {Card, CardContent} from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {Plus} from "lucide-react";
import {useState} from "react";
import {Formik} from "formik";

export default function Home() {
  // create room
  const createRoomFunc = () => {};

  const [open, setOpen] = useState(false);

  return (
    <div className="h-screen mx-auto">
      <Navbar />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              room.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <div className="h-screen w-full bg-yellow-100 py-4">
        <div className="h-[400px] w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-10">
            <Card
              className={`w-full cursor-pointer transition-all "hover:ring-2 hover:ring-primary/50 flex items-center justify-center`}
              onClick={() => {
                // setFieldValue("pokemonId", index + 1);
                // setSelectedPokemon(index + 1);
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
                    {/* <p className="text-sm text-muted-foreground mb-2">
                      Type: {pokemonData[index].type}
                    </p> */}
                    <div className="flex items-centerc justify-center">
                      <div className="rounded-3xl w-[90px] h-[30px] border-2"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
