import React, { useState, useEffect } from "react";
import * as PIXI from "pixi.js";
import { Sprite, Stage } from "@pixi/react";

const VideoBackground = () => {
  const [videoTexture, setVideoTexture] =
    useState<PIXI.Texture<PIXI.Resource>>();

  useEffect(() => {
    const video = document.createElement("video");
    video.src = "videos/V1reel.mp4";
    video.loop = true;
    video.muted = true;
    video.controls = true;
    video.width = 300;
    video.height = 300;
    const texture = PIXI.Texture.from(video);
    setVideoTexture(texture);
  }, []);

  return videoTexture !== null ? (
    <div style={{ position: "relative" }}>
      <Stage width={320} height={500} options={{ backgroundColor: "white" }}>
        <Sprite texture={videoTexture} scale={new PIXI.Point(0.25, 0.25)} />
      </Stage>
    </div>
  ) : (
    <div>Loading Video...</div>
  );
};
export default VideoBackground;
