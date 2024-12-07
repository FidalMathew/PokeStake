"use client";
import {useState, useEffect} from "react";
import {pokemonData} from "@/lib/data";
import {Card, CardContent} from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import {
  useLocalAudio,
  useLocalScreenShare,
  useLocalVideo,
  useRoom,
} from "@huddle01/react/hooks";
import {Audio, Video} from "@huddle01/react/components";
import {useLocalMedia} from "@huddle01/react/hooks";
import ShowPeers from "@/components/ShowPeer";
import {Button} from "@/components/ui/button";
import {Formik, Form, Field} from "formik";
import HuddleComponent from "@/components/HuddleComponent";

export default function Home() {
  const [selectedPokemon, setSelectedPokemon] = useState<number | null>(null);

  // const handleSelectPokemon = (id: number) => {
  //   console.log(id, "id -- debug");
  //   setSelectedPokemon(id);
  // };

  const {joinRoom, leaveRoom} = useRoom({
    onJoin: () => {
      console.log("Joined the room");
    },
    onLeave: () => {
      console.log("Left the room");
    },
  });

  const {
    stream: streamVideo,
    enableVideo,
    disableVideo,
    isVideoOn,
  } = useLocalVideo();
  const {
    stream: streamAudio,
    enableAudio,
    disableAudio,
    isAudioOn,
  } = useLocalAudio();
  const {startScreenShare, stopScreenShare, shareStream} =
    useLocalScreenShare();

  const {fetchStream} = useLocalMedia();

  const [roomId, setRoomId] = useState("nyd-xtfb-bjd");
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const fetchToken = async () => {
      console.log(roomId, "roomId -----");
      const res = await fetch(`/api/token?roomId=${roomId}`);
      const data = await res.text();

      console.info({data});

      setAccessToken(data as string);
    };

    console.log(roomId, "roomId -----");

    if (roomId) {
      fetchToken();
    }
  }, [roomId]);

  console.log(selectedPokemon, "selectedPokemon");

  return (
    <div className="h-[200vh] mx-auto">
      <Navbar />
      <Formik
        initialValues={{pokemonId: 0}}
        onSubmit={(values) => {
          console.log(pokemonData[values.pokemonId - 1]);
        }}
      >
        {({errors, touched, setFieldValue}) => (
          <Form>
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
      {/* {selectedPokemon && (
        <div className="mt-8 text-center">
          <h2 className="text-2xl font-bold">
            Selected Pokemon:{" "}
            {pokemonData.find((p) => p.id === selectedPokemon)?.name}
          </h2>
        </div>
      )} */}

      <HuddleComponent
        joinRoom={joinRoom}
        leaveRoom={leaveRoom}
        enableVideo={enableVideo}
        disableVideo={disableVideo}
        isVideoOn={isVideoOn}
        enableAudio={enableAudio}
        disableAudio={disableAudio}
        isAudioOn={isAudioOn}
        startScreenShare={startScreenShare}
        stopScreenShare={stopScreenShare}
        shareStream={shareStream}
        fetchStream={fetchStream}
        streamVideo={streamVideo}
        streamAudio={streamAudio}
        roomId={roomId}
        setRoomId={setRoomId}
        accessToken={accessToken}
        setAccessToken={setAccessToken}
      />
    </div>
  );
}
