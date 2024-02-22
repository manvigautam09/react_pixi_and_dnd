import { useRef, useState } from "react";
import { Stage } from "@pixi/react";
import DraggableText from "../DraggableText";

const ReelCanvas = () => {
  const stageRef: any = useRef();

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
    <Stage
      ref={stageRef}
      options={{ backgroundAlpha: 0 }}
      width={384}
      height={675}
    >
      <DraggableText
        text="Drag me around"
        initialX={100}
        initialY={100}
        style={{ fontFamily: "Arial", fontSize: 24, fill: "red" }}
      />
    </Stage>
  );
};
export default ReelCanvas;
