"use client";

import { useState } from "react";
import { Application } from "pixi.js";
import { DndProvider } from "react-dnd";
import { AppProvider } from "@pixi/react";
import { HTML5Backend } from "react-dnd-html5-backend";

import DndCanvas from "@/components/DndCanvas";
import ReelCanvas from "@/components/ReelCanvas";
import CombinedCanvas from "@/components/CombinedCanvas";

const app = new Application();

const VideoMakerApp = () => {
  console.log("### this is the VideoMakerApp");
  // State to keep track of sprite positions
  const [texts, setTexts] = useState([
    {
      id: 1,
      x: 100,
      y: 100,
      text: "Hello world",
      style: { fontFamily: "Arial", fontSize: 24, fill: "red" },
    },
    // ... other sprites
  ]);

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
            <DndCanvas texts={texts} setTexts={setTexts} />
          </div>
        </div>
        <div className="flex justify-center items-center h-screen bg-red-100 relative">
          <div className="w-full sm:w-96 bg-gray-light-5 h-4/5 absolute">
            <CombinedCanvas texts={texts} setTexts={setTexts} />
          </div>
          <div className="w-full sm:w-96 h-4/5 absolute">
            <DndCanvas texts={texts} setTexts={setTexts} />
          </div>
        </div>
      </AppProvider>
    </DndProvider>
  );
};

export default VideoMakerApp;
