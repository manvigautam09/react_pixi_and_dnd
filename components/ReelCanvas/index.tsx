import { useRef } from "react";
import { Stage } from "@pixi/react";

import DraggableText from "../DraggableText";

const ReelCanvas = () => {
  const stageRef: any = useRef();

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
