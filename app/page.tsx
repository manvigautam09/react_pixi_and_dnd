"use client";

import React, { useEffect, useRef, useState } from "react";
import { Application } from "pixi.js";
import { AppProvider } from "@pixi/react";

import { SlideType } from "@/utils/types";
import PixiCanvas from "@/components/PixiCanvas";
import { fetchSlideData } from "@/services/helpers";
import VideoDetails from "@/components/VideoDetails";

const app = new Application();

const Home = () => {
  const stageRef = useRef();
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

  return (
    <AppProvider value={app}>
      <div className="flex justify-end items-center h-screen bg-[#FBFCFE]">
        {slideData && <PixiCanvas slideData={slideData} stageRef={stageRef} />}
        <VideoDetails stageRef={stageRef} />
      </div>
    </AppProvider>
  );
};

export default Home;
