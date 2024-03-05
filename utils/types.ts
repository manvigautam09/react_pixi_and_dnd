import { ITextStyle } from "pixi.js";

type AspectRatio = "16:9 | 1:1 | 4:5 | 9:16";
export interface TransitionInterface {
  enter: { type: "fade" | "slide" | "zoom" | "none"; duration: number }; // can be more according to what we decide
  exit: { type: "fade" | "slide" | "zoom" | "none"; duration: number };
  direction: "left | right | up | down";
}

export interface TextLayerInterface {
  type: "text";
  id: string;
  title: string;
  rotate?: number;
  position: {
    x: number;
    y: number;
  };
  transition?: TransitionInterface;
  style?: ITextStyle;
  startTime: number;
  endTime: number;
}

export interface ImageLayerInterface {
  type: "image";
  id: string;
  url: string;
  rotate?: number;
  position: {
    x: number;
    y: number;
  };
  style: {
    width: number;
    height: number;
    objectFit: "cover" | "contain";
  };
  startTime?: number;
  endTime?: number;
}

export interface StickerLayerInterface {
  type: "sticker";
  id: string;
  url: string;
  rotate?: number;
  position: {
    x: number;
    y: number;
  };
  animation?: {
    type: "bounce | shake | rotate | flip";
    duration: number;
  };
  startTime?: number;
  endTime?: number;
}

export type LayerType =
  | TextLayerInterface
  | ImageLayerInterface
  | StickerLayerInterface;

export interface AudioInterface {
  url: string;
  duration: number;
  showCaptions: boolean;
  captions: string;
  volume: number;
}

export interface SlideBackgroundInterface {
  type: "image" | "video" | "color";
  imageUrl?: string;
  videoUrl?: string;
  hexCode: string;
}

export interface SlideInterface {
  id: string;
  duration: number;
  background: SlideBackgroundInterface;
  layers: LayerType[];
  audio?: AudioInterface;
  transition?: TransitionInterface;
}
export interface VideoInterface {
  id: string;
  projectName: string;
  aspectRatio: AspectRatio;
  thumbnail?: string;
  slides: SlideInterface[];
  audio?: AudioInterface;
  transition?: TransitionInterface;
}

// Old structure
export interface TextType {
  id: string;
  title: string;
  rotate?: number;
  position?: { x: number; y: number };
  style?: ITextStyle;
}

export interface SlideType {
  type: "video" | "image" | "text" | "sticker"; // Type of the asset
  asset: string; // Reference to the asset
  // text?: TextType[]; // Text to be displayed on the asset
}
