"use client";

import React, { useEffect, useState } from "react";
import { Application } from "pixi.js";
import { AppProvider } from "@pixi/react";

import { SlideType } from "@/utils/types";
import PixiCanvas from "@/components/PixiCanvas";

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
      <div className="flex justify-center items-center h-screen bg-[#FBFCFE]">
        {slideData && <PixiCanvas slideData={slideData} />}
      </div>
    </AppProvider>
  );
};

export default Home;
