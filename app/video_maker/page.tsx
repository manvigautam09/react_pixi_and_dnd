"use client";

import { useRef } from "react";
import { Stage, Text } from "@pixi/react";

const VideoMaker = () => {
  const stageRef: any = useRef();

  return (
    <div className="flex justify-center items-center h-screen bg-[#FBFCFE]">
      <div className="w-full sm:w-96 bg-gray-light-5 h-4/5">
        <Stage
          ref={stageRef}
          options={{ backgroundAlpha: 0 }}
          width={384}
          height={675}
        >
          <Text text="Loading.." />
        </Stage>
      </div>
    </div>
  );
};

export default VideoMaker;
