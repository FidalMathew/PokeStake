import {
  usePeerIds,
  useRemoteVideo,
  useRemoteAudio,
  useRemoteScreenShare,
} from "@huddle01/react/hooks";
import { Audio, Video } from "@huddle01/react/components";
import { FC } from "react";

import { Role } from "@huddle01/server-sdk/auth";

interface RemotePeerProps {
  peerId: string;
}

const RemotePeer: FC<RemotePeerProps> = ({ peerId }) => {
  //  const {peerIds} = usePeerIds({
  //   labels: [
  //     "audio",
  //   ],
  //   roles
  //  })
  const { stream: videoStream } = useRemoteVideo({ peerId });
  const { stream: audioStream } = useRemoteAudio({ peerId });
  const { videoStream: screenVideoStream, audioStream: screenAudioStream } =
    useRemoteScreenShare({ peerId });

  return (
    <div>
      {videoStream && <Video stream={videoStream} />}
      {audioStream && <Audio stream={audioStream} />}
      {screenVideoStream && <Video stream={screenVideoStream} />}
      {screenAudioStream && <Audio stream={screenAudioStream} />}
    </div>
  );
};

const ShowPeers = () => {
  const { peerIds } = usePeerIds({ roles: [Role.HOST, Role.CO_HOST] }); // Get Hosts And Cohost's peerIds

  console.log(peerIds, "peerIds");
  return (
    <div>
      {peerIds.map((peerId) => {
        return <RemotePeer peerId={peerId} />;
      })}
    </div>
  );
};

export default ShowPeers;
