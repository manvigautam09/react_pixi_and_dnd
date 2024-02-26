"use client";
import React, { useEffect, useRef, useState } from "react";
import { Application } from "pixi.js";
import { AppProvider, Sprite, Stage } from "@pixi/react";

import { SlideType } from "@/utils/types";

const app = new Application();

async function fetchSlideData() {
  try {
    const response = await fetch(
      "http://localhost:3005/pixi-slide?slideNum=1",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching slide data:", error);
  }
}

const Home = () => {
  const stageRef: any = useRef();
  const [slideData, setSlideData] = useState<SlideType>();

  const getSlideData = async () => {
    const data: SlideType = await fetchSlideData();
    if (data !== undefined) {
      setSlideData(data);
    }
  };

  useEffect(() => {
    if (!slideData) {
      getSlideData();
    }
  }, [slideData]);

  const slideType = slideData?.type;

  return (
    <AppProvider value={app}>
      <div className="flex justify-center items-center h-screen bg-[#FBFCFE]">
        <Stage
          ref={stageRef}
          options={{ backgroundColor: "#EAECF0EE" }}
          width={400}
          height={700}
        >
          {slideType === "image" && (
            <Sprite
              image={`http://localhost:3005/slide-image?name=${slideData?.asset}`}
              width={400}
              height={700}
            />
          )}
        </Stage>
      </div>
    </AppProvider>
  );
};

export default Home;
