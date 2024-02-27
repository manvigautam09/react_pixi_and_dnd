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
  const [videoDuration, setVideoDuration] = useState(
    location.search.split("?").length > 1
      ? Number(location.search.split("?")[1].split("=")[1])
      : 1
  );
  const [framePerSecond, setFramePerSecond] = useState(
    location.search.split("?").length > 1
      ? Number(location.search.split("?")[2].split("=")[1])
      : 24
  );
  const [recordingVideo, setRecordingVideo] = useState(false);

  const videoId =
    location.search.split("?").length > 1
      ? location.search.split("?")[3].split("=")[1]
      : null;

  const handleOptionChange = (e: any) => {
    setFramePerSecond(Number(e.target.value));
  };

  const handleInputChange = (e: any) => {
    setVideoDuration(Number(e.target.value));
  };

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
        {slideData && <PixiCanvas slideData={slideData} />}
        <div className="flex flex-col justify-start w-[500px] h-full p-16">
          <div id="frames-list" style={{ display: "none" }}></div>
          <select
            value={framePerSecond}
            onChange={handleOptionChange}
            style={{
              height: 36,
              margin: 10,
              paddingLeft: 10,
              paddingRight: 10,
            }}
            disabled={recordingVideo}
          >
            <option value="24">Select frames per second (24)</option>
            <option value="30">30</option>
            <option value="48">48</option>
            <option value="60">60</option>
          </select>

          <input
            type="number"
            min={1}
            max={300}
            value={videoDuration}
            disabled={recordingVideo}
            onChange={handleInputChange}
            style={{
              height: 18,
              margin: 10,
              paddingLeft: 10,
              paddingRight: 10,
            }}
          />

          <button
            style={{ height: 36, margin: 10 }}
            // onClick={recordVideoFromPuppeteer}
          >
            Download
          </button>
        </div>
      </div>
    </AppProvider>
  );
};

export default Home;
