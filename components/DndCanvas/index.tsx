import { Dispatch, SetStateAction } from "react";

import DroppableArea from "./DroppableArea";
import DraggableText from "./DraggableText";

const DndCanvas = ({
  texts,
  setTexts,
}: {
  texts: {
    id: number;
    x: number;
    y: number;
    text: string;
    style: {
      fontFamily: string;
      fontSize: number;
      fill: string;
    };
  }[];
  setTexts: Dispatch<
    SetStateAction<
      {
        id: number;
        x: number;
        y: number;
        text: string;
        style: {
          fontFamily: string;
          fontSize: number;
          fill: string;
        };
      }[]
    >
  >;
}) => {
  const handleDrop = (id: string, x: number, y: number) => {
    // Update the position of the sprite that was moved
    setTexts(
      texts.map((text) => {
        if (text.id.toString() === id.toString()) {
          return { ...text, x, y };
        }
        return text;
      })
    );
  };

  return (
    <DroppableArea onDrop={handleDrop}>
      <DraggableText
        id="1"
        x={texts[0].x}
        y={texts[0].y}
        text={texts[0].text}
        style={texts[0].style}
      />
    </DroppableArea>
  );
};
export default DndCanvas;
