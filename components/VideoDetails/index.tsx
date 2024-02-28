import { MutableRefObject, useRef, useState } from "react";

import { recordVideoFromPuppeteer } from "@/services/helpers";

interface VideoDetailsProps {
  stageRef: MutableRefObject<any>;
}

const VideoDetails = ({ stageRef }: VideoDetailsProps) => {
  const durationRef = useRef(1);
  const framesData: any = useRef([]);
  const durationInsideSecondRef = useRef(1);
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
  console.log("### location", location);
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

  const recordVideo = () => {
    setRecordingVideo(true);
    if (stageRef.current) {
      const app = stageRef.current.app; // Access the Pixi Application
      const renderer = app.renderer; // Access the renderer
      const framesDiv = document.getElementById("frames-list");
      console.log("app", app);
      console.log("renderer", renderer);
      const captureFrameForSec = (secIdx: number) => {
        // console.log("### secIdx", secIdx);
        const captureFrame = async (milliSecondIdx: number) => {
          //   console.log("### milliSecondIdx", milliSecondIdx);
          console.log(
            "### framePerSecond variable",
            framePerSecond * (secIdx - 1) + milliSecondIdx
          );
          renderer.render(app.stage); // Render the current state to the renderer
          const frameData = renderer.view.toDataURL(); // Capture the frame as an image
          console.log("### frameData ", frameData);
          framesData.current = [
            ...framesData.current,
            {
              frameData,
              id: `image-${framePerSecond * (secIdx - 1) + milliSecondIdx}.png`,
            },
          ];
          //   console.log("### framesData", framesData.current);
          //   console.log(
          //     framePerSecond,
          //     framePerSecond * (secIdx - 1) + milliSecondIdx
          //   );

          const li = document.createElement("li");
          li.appendChild(document.createTextNode(frameData));
          li.id = `image-${framePerSecond * (secIdx - 1) + milliSecondIdx}.png`;
          framesDiv?.appendChild(li);

          // if (secIdx === videoDuration && milliSecondIdx === framePerSecond) {
          //   setRecordingVideo(false);
          //   // setShowMakeVideo(true);
          //   const frameRecordedDiv = document.createElement("div");
          //   frameRecordedDiv.id = `id-${videoId}`;
          //   frameRecordedDiv.innerHTML = "Video recorded";
          //   document.body.appendChild(frameRecordedDiv);
          //   frameRecordedDiv.style.display = "none";
          // }

          if (durationInsideSecondRef.current > framePerSecond - 1) {
            clearInterval(frameIntervalId);
            durationInsideSecondRef.current = 0;
          }
        };

        const frameIntervalId = setInterval(() => {
          captureFrame(durationInsideSecondRef.current);
          durationInsideSecondRef.current++;
        }, 1000 / framePerSecond);

        if (durationRef.current > videoDuration - 1) {
          console.log("### durationRef.current", durationRef.current);
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

  return (
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

      <div className="pl-3 text-sm">Video Duration(Min: 1sec Max: 300sec)</div>
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
        onClick={() => recordVideoFromPuppeteer(videoDuration, framePerSecond)}
      >
        Download
      </button>
      <button onClick={recordVideo} id="record-video-button">
        Record video
      </button>
    </div>
  );
};

export default VideoDetails;
