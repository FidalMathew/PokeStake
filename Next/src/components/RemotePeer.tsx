"use client";

import { Video, Audio } from "@huddle01/react/components";
import {
  useRemoteAudio,
  useRemoteScreenShare,
  useRemoteVideo,
} from "@huddle01/react/hooks";
import React from "react";

const RemotePeer = ({ peerId }: { peerId: any }) => {
  const { stream } = useRemoteVideo({ peerId });
  const { stream: audioStream } = useRemoteAudio({ peerId });
  const { videoStream: screenVideo, audioStream: screenAudio } =
    useRemoteScreenShare({ peerId });

  return (
    <div className="flex flex-col gap-2">
      {stream && (
        <Video
          stream={stream}
          className="border-2 rounded-xl border-white-400 aspect-video"
        />
      )}
      {screenVideo && (
        <Video
          stream={screenVideo}
          className="border-2 rounded-xl border-white-400 aspect-video"
        />
      )}
      {audioStream && <Audio stream={audioStream} autoPlay />}
      {screenAudio && <Audio stream={screenAudio} autoPlay />}
    </div>
  );
};

export default React.memo(RemotePeer);
