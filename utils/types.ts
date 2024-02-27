import { ITextStyle } from "pixi.js";

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
  text?: TextType[]; // Text to be displayed on the asset
}
