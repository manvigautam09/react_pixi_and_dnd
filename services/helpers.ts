import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { v4 as uuidv4 } from "uuid";

export async function fetchSlideData() {
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
interface RecordVideoProps {
  setRecordingVideo: Dispatch<SetStateAction<boolean>>;
  stageRef: MutableRefObject<any>;
  videoDuration: Number;
  framePerSecond: Number;
}

// function base64ToBlob(base64, mimeType) {
//     const byteString = window.atob(base64.split(",")[1]);
//     const arrayBuffer = new ArrayBuffer(byteString.length);
//     const int8Array = new Uint8Array(arrayBuffer);

//     for (let i = 0; i < byteString.length; i++) {
//       int8Array[i] = byteString.charCodeAt(i);
//     }

//     return new Blob([int8Array], { type: mimeType });
//   }

// const recordVideo = ({setRecordingVideo,stageRef}:RecordVideoProps) => {
//     setRecordingVideo(true);
//     if (stageRef.current) {
//       const app = stageRef.current.app; // Access the Pixi Application
//       const renderer = app.renderer; // Access the renderer

//       const captureFrameForSec = (secIdx) => {
//         const captureFrame = (milliSecondIdx) => {
//           renderer.render(app.stage); // Render the current state to the renderer
//           const frameData = renderer.view.toDataURL(); // Capture the frame as an image
//           const blob = base64ToBlob(
//             frameData,
//             `image-${framePerSecond * (secIdx - 1) + milliSecondIdx}/png`
//           );

//           framesData.current[secIdx][milliSecondIdx] = blob;
//           console.log(framesData.current, secIdx, milliSecondIdx);
//           console.log("### videoDuration", videoDuration);
//           console.log("### framePerSecond", framePerSecond);
//           const framesDiv = document.getElementById("frames-list");
//           const li = document.createElement("li");
//           li.appendChild(document.createTextNode(frameData));
//           li.id = `image-${framePerSecond * (secIdx - 1) + milliSecondIdx}.png`;
//           framesDiv.appendChild(li);

//           if (secIdx === videoDuration && milliSecondIdx === framePerSecond) {
//             setRecordingVideo(false);
//             setShowMakeVideo(true);
//             // makeVideoFromFfmpeg(videoDuration, framePerSecond, videoId);
//             const frameRecordedDiv = document.createElement("div");
//             frameRecordedDiv.id = `id-${videoId}`;
//             frameRecordedDiv.innerHTML = "Video recorded";
//             document.body.appendChild(frameRecordedDiv);
//             frameRecordedDiv.style.display = "none";
//           }

//           if (durationInsideSecondRef.current > framePerSecond - 1) {
//             clearInterval(frameIntervalId);
//             durationInsideSecondRef.current = 0;
//           }
//         };

//         framesData.current[secIdx] = {};

//         const frameIntervalId = setInterval(() => {
//           captureFrame(durationInsideSecondRef.current);
//           durationInsideSecondRef.current++;
//         }, 1000 / framePerSecond);

//         if (durationRef.current > videoDuration - 1) {
//           clearInterval(secIntervalId);
//         }
//       };

//       // Example: Capture a frame every second
//       const secIntervalId = setInterval(() => {
//         captureFrameForSec(durationRef.current);
//         durationRef.current++;
//       }, 1000);
//     }
//   };

export const recordVideoFromPuppeteer = async (
  videoDuration: Number,
  framePerSecond: Number
) => {
  //   try {
  //     const res = await fetch("http://localhost:3005/record-video", {
  //       headers: { "Content-type": "application/json; charset=UTF-8" },
  //       method: "POST",
  //       body: JSON.stringify({ id: uuidv4(), videoDuration, framePerSecond }),
  //     });
  //     console.log("### res", res);
  //   } catch (error) {
  //     console.log("### error", error);
  //   }
};
