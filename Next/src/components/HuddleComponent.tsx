import {Audio, Video} from "@huddle01/react/components";
import ShowPeers from "./ShowPeer";
import {Button} from "./ui/button";
import {
  Video as VideoIcon,
  VideoOff,
  LogOut,
  Mic,
  Monitor,
  Camera,
  Mic2,
} from "lucide-react";
export default function HuddleComponent({
  joinRoom,
  leaveRoom,
  enableVideo,
  disableVideo,
  isVideoOn,
  enableAudio,
  disableAudio,
  isAudioOn,
  startScreenShare,
  stopScreenShare,
  shareStream,
  fetchStream,
  streamVideo,
  streamAudio,
  roomId,
  setRoomId,
  accessToken,
  setAccessToken,
}: {
  joinRoom: any;
  leaveRoom: any;
  enableVideo: any;
  disableVideo: any;
  isVideoOn: any;
  enableAudio: any;
  disableAudio: any;
  isAudioOn: any;
  startScreenShare: any;
  stopScreenShare: any;
  shareStream: any;
  fetchStream: any;
  streamVideo: any;
  streamAudio: any;
  roomId: any;
  setRoomId: any;
  accessToken: any;
  setAccessToken: any;
}) {
  return (
    <div className="mt-24 h-fit w-full bg-purple-100">
      <div className="w-[600px] h-[400px] bg-yellow-400 mx-auto rounded-3xl">
        <div>{streamVideo && <Video stream={streamVideo} />}</div>
      </div>
      <div className="">
        <div>{streamAudio && <Audio stream={streamAudio} />}</div>
      </div>
      <div className="flex gap-4">
        {/* Create Room Button */}
        <Button
          variant="outline"
          size="lg"
          className="flex items-center gap-2"
          onClick={async () => {
            const res = await fetch("/api/createRoom", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                title: "Huddle01 Room",
              }),
            });
            console.log(res, "ress");

            if (res.ok) {
              const data = await res.json();

              console.log(data, "data");
              setRoomId(data.data.roomId);
            }
          }}
        >
          <VideoIcon className="h-5 w-5" />
          Create Room
        </Button>

        {/* Join Room Button */}
        <Button
          variant="default"
          size="lg"
          className="flex items-center gap-2"
          onClick={async () => {
            console.info({accessToken, roomId});
            const room = await joinRoom({
              roomId: roomId,
              token: accessToken,
            });

            console.log(room, "room");
          }}
        >
          <VideoOff className="h-5 w-5" />
          Join Room
        </Button>

        {/* Leave Room Button */}
        <Button
          variant="destructive"
          size="lg"
          className="flex items-center gap-2"
          onClick={leaveRoom}
        >
          <LogOut className="h-5 w-5" />
          Leave Room
        </Button>
      </div>

      <div className="space-y-4">
        {/* Webcam Toggle */}
        <Button
          variant="default"
          size="lg"
          className="flex items-center gap-2"
          onClick={() => {
            isVideoOn ? disableVideo() : enableVideo();
          }}
        >
          <VideoIcon className="h-5 w-5" />
          {isVideoOn ? "Stop Video Stream" : "Start Video Stream"}
        </Button>

        {/* Mic Toggle */}
        <Button
          variant="default"
          size="lg"
          className="flex items-center gap-2"
          onClick={() => {
            isAudioOn ? disableAudio() : enableAudio();
          }}
        >
          <Mic className="h-5 w-5" />
          {isAudioOn ? "Stop Audio Stream" : "Start Audio Stream"}
        </Button>

        {/* Screen Share Toggle */}
        <Button
          variant="outline"
          size="lg"
          className="flex items-center gap-2"
          onClick={() => {
            shareStream ? stopScreenShare() : startScreenShare();
          }}
        >
          <Monitor className="h-5 w-5" />
          {shareStream ? "Stop Screen Share" : "Start Screen Share"}
        </Button>

        <div className="mt-6 space-y-2">
          {/* Fetch Webcam Stream */}
          <Button
            variant="outline"
            size="lg"
            className="flex items-center gap-2"
            onClick={() => fetchStream({mediaDeviceKind: "cam"})}
          >
            <Camera className="h-5 w-5" />
            Fetch Webcam Stream
          </Button>

          {/* Fetch Mic Stream */}
          <Button
            variant="outline"
            size="lg"
            className="flex items-center gap-2"
            onClick={() => fetchStream({mediaDeviceKind: "mic"})}
          >
            <Mic2 className="h-5 w-5" />
            Fetch Mic Stream
          </Button>
        </div>

        <div className="mt-6">
          {/* Separator */}
          <hr className="my-4 border-gray-200" />
          {/* Show Peers Component */}
          <ShowPeers />
        </div>
      </div>
    </div>
  );
}
