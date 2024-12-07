import {Audio, Video} from "@huddle01/react/components";
import ShowPeers from "./ShowPeer";
import {Button} from "./ui/button";

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
      <div className="flex gap-4">
        <Button
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
          Create Room
        </Button>

        <Button
          onClick={async () => {
            console.info({accessToken, roomId});
            const room = await joinRoom({
              roomId: roomId,
              token: accessToken,
            });

            console.log(room, "room");
          }}
        >
          Join Room
        </Button>
        <Button onClick={leaveRoom}>Leave Room</Button>
      </div>
      <div>
        {/* Webcam */}
        <Button
          onClick={() => {
            isVideoOn ? disableVideo() : enableVideo();
          }}
        >
          Fetch and Produce Video Stream
        </Button>

        {/* Mic */}
        <Button
          onClick={() => {
            isAudioOn ? disableAudio() : enableAudio();
          }}
        >
          Fetch and Produce Audio Stream
        </Button>

        {/* Screen Share */}
        <Button
          onClick={() => {
            shareStream ? stopScreenShare() : startScreenShare();
          }}
        >
          Fetch and Produce Screen Share Stream
        </Button>

        <div>
          {/* Webcam */}
          <Button onClick={() => fetchStream({mediaDeviceKind: "cam"})}>
            Fetch Cam Stream
          </Button>
          {/* Mic */}
          <Button onClick={() => fetchStream({mediaDeviceKind: "mic"})}>
            Fetch Mic Stream
          </Button>
          <div>{streamVideo && <Video stream={streamVideo} />}</div>
          <div>{streamAudio && <Audio stream={streamAudio} />}</div>
          ---------------------------------------------------------------------
          <ShowPeers />
        </div>
      </div>
    </div>
  );
}
