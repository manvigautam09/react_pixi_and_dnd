"use client";
import React, { useEffect, useState } from "react";
import { Application } from "pixi.js";
import { AppProvider } from "@pixi/react";

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

const app = new Application();
const Home = () => {
  const [slideData, setSlideData] = useState(null);

  const getSlideData = async () => {
    const data = await fetchSlideData();
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
        <div className="w-full sm:w-96 bg-gray-light-5 h-4/5">Home</div>
      </div>
    </AppProvider>
  );
};
export default Home;
