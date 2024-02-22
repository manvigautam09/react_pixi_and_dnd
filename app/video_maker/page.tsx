"use client";

import { AppProvider } from "@pixi/react";
import { Application } from "pixi.js";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import DndCanvas from "@/components/DndCanvas";
import ReelCanvas from "@/components/ReelCanvas";

const app = new Application();

const VideoMakerApp = () => {
  console.log("### this is the VideoMakerApp");

  return (
    <DndProvider backend={HTML5Backend}>
      <AppProvider value={app}>
        <div className="flex justify-center items-center h-screen bg-[#FBFCFE]">
          <div className="w-full sm:w-96 bg-gray-light-5 h-4/5">
            <ReelCanvas />
          </div>
        </div>
        <div className="flex justify-center items-center h-screen bg-[#FBFCFE]">
          <div className="w-full sm:w-96 bg-gray-light-5 h-4/5">
            <DndCanvas />
          </div>
        </div>
      </AppProvider>
    </DndProvider>
  );
};

export default VideoMakerApp;
