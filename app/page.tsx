"use client";
// Test URL ?duration=2?fps=24?videoId=d2d4c589-ee23-4dc5-a218-fe738e52cd6a
import React, { Fragment, useEffect, useRef, useState } from "react";

import { v4 as uuidv4 } from "uuid";
import { Application } from "pixi.js";
import { AppProvider, Sprite, Stage, Text } from "@pixi/react";

import { SlideType } from "@/utils/types";
import TextLayer from "@/components/TextLayer";
import { fetchSlideData } from "@/services/helpers";
import BunnyAnimation from "@/components/BunnyAnimation";

const app = new Application();

const App = () => {
  const stageRef = useRef<any>();
  const framesData = useRef<any>({});
  const durationRef = useRef(1);
  const durationInsideSecondRef = useRef(1);
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

  const [videoDuration, setVideoDuration] = useState(
    location.search.split("?").length > 1
      ? Number(location.search.split("?")[1].split("=")[1])
      : 2
  );
  const [framePerSecond, setFramePerSecond] = useState(
    location.search.split("?").length > 1
      ? Number(location.search.split("?")[2].split("=")[1])
      : 24
  );
  const videoId =
    location.search.split("?").length > 1
      ? location.search.split("?")[3].split("=")[1]
      : null;
  const [recordingVideo, setRecordingVideo] = useState(false);
  const [showMakeVideo, setShowMakeVideo] = useState(false);

  const handleOptionChange = (e: any) => {
    setFramePerSecond(Number(e.target.value));
  };

  const handleInputChange = (e: any) => {
    setVideoDuration(Number(e.target.value));
  };

  const recordVideo = () => {
    setRecordingVideo(true);
    if (stageRef.current) {
      const app = stageRef.current.app; // Access the Pixi Application
      const renderer = app.renderer; // Access the renderer

      const captureFrameForSec = (secIdx: number) => {
        const captureFrame = (milliSecondIdx: number) => {
          renderer.render(app.stage); // Render the current state to the renderer
          const frameData = renderer.view.toDataURL(); // Capture the frame as an image
          //   const blob = base64ToBlob(
          //     frameData,
          //     `image-${framePerSecond * (secIdx - 1) + milliSecondIdx}/png`
          //   );

          //   framesData.current[secIdx][milliSecondIdx] = blob;
          console.log(framesData.current, secIdx, milliSecondIdx);
          console.log("### videoDuration", videoDuration);
          console.log("### framePerSecond", framePerSecond);
          const framesDiv = document.getElementById("frames-list");
          const li = document.createElement("li");
          li.appendChild(document.createTextNode(frameData));
          li.id = `image-${framePerSecond * (secIdx - 1) + milliSecondIdx}.png`;
          framesDiv?.appendChild(li);

          if (secIdx === videoDuration && milliSecondIdx === framePerSecond) {
            setRecordingVideo(false);
            setShowMakeVideo(true);
            // makeVideoFromFfmpeg(videoDuration, framePerSecond, videoId);
            const frameRecordedDiv = document.createElement("div");
            frameRecordedDiv.id = `id-${videoId}`;
            frameRecordedDiv.innerHTML = "Video recorded";
            document.body.appendChild(frameRecordedDiv);
            frameRecordedDiv.style.display = "none";
          }

          if (durationInsideSecondRef.current > framePerSecond - 1) {
            clearInterval(frameIntervalId);
            durationInsideSecondRef.current = 0;
          }
        };

        framesData.current[secIdx] = {};

        const frameIntervalId = setInterval(() => {
          captureFrame(durationInsideSecondRef.current);
          durationInsideSecondRef.current++;
        }, 1000 / framePerSecond);

        if (durationRef.current > videoDuration - 1) {
          clearInterval(secIntervalId);
        }
      };

      // Example: Capture a frame every second
      const secIntervalId = setInterval(() => {
        captureFrameForSec(durationRef.current);
        durationRef.current++;
      }, 1000);
    }
  };

  const recordVideoFromPuppeteer = async () => {
    try {
      const res = await fetch("http://localhost:3005/record-video", {
        headers: { "Content-type": "application/json; charset=UTF-8" },
        method: "POST",
        body: JSON.stringify({ id: uuidv4(), videoDuration, framePerSecond }),
      });
      console.log("### res", res);
    } catch (error) {
      console.log("### error", error);
    }
  };

  const slideType = slideData?.type;
  const text = slideData?.text;

  return (
    <AppProvider value={app}>
      <div className="flex justify-around pt-6">
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
          <BunnyAnimation />
          {text && text?.length > 0 && <TextLayer textDetails={text} />}
        </Stage>
        <div style={{ display: "flex", flexDirection: "column", width: 500 }}>
          <div id="frames-list" style={{ display: "none" }}></div>
          <select
            value={framePerSecond}
            onChange={handleOptionChange}
            style={{
              height: 36,
              margin: 10,
              paddingLeft: 10,
              paddingRight: 10,
              border: "slategray 1px solid",
              borderRadius: 5,
              backgroundColor: "white",
            }}
            disabled={recordingVideo}
          >
            <option value="24">Select frames per second (24)</option>
            <option value="30">30</option>
            <option value="48">48</option>
            <option value="60">60</option>
          </select>
          <div className="pl-3 text-sm">
            Video Duration(Min: 1sec Max: 30sec)
          </div>
          <input
            type="number"
            min={2}
            max={30}
            value={videoDuration}
            disabled={recordingVideo}
            onChange={handleInputChange}
            style={{
              height: 18,
              margin: 10,
              marginTop: 0,
              padding: 18,
              paddingLeft: 10,
              paddingRight: 10,
              border: "slategray 1px solid",
              borderRadius: 5,
              backgroundColor: "white",
            }}
          />

          <button
            style={{
              height: 36,
              margin: 10,
              border: "slategray 1px solid",
              borderRadius: 5,
              backgroundColor: "white",
            }}
            onClick={recordVideoFromPuppeteer}
          >
            Download
          </button>
          <button
            style={{ height: 36, margin: 10, visibility: "hidden" }}
            onClick={recordVideo}
            id="record-video-button"
          >
            Record video
          </button>
        </div>
      </div>
    </AppProvider>
  );
};

export default App;
