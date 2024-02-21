"use client";

import ReelCanvas from "@/components/VideoMaker";
import { AppProvider } from "@pixi/react";
import { Application } from "pixi.js";

const app = new Application();

const VideoMakerApp = () => {
  return (
    <AppProvider value={app}>
      <div className="flex justify-center items-center h-screen bg-[#FBFCFE]">
        <div className="w-full sm:w-96 bg-gray-light-5 h-4/5">
          <ReelCanvas />
        </div>
      </div>
    </AppProvider>
  );
};

export default VideoMakerApp;
