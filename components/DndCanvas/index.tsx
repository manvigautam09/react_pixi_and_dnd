import { useRef, useState } from "react";

import DroppableArea from "./DroppableArea";
import DraggableText from "./DraggableText";

const DndCanvas = () => {
  // State to keep track of sprite positions
  const [texts, setTexts] = useState([
    { id: 1, x: 100, y: 100, text: "Hello world" },
    // ... other sprites
  ]);

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
        text="Drag me around"
      />
    </DroppableArea>
  );
};
export default DndCanvas;
