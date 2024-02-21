import { useRef } from "react";
import { Stage, Text } from "@pixi/react";

const ReelCanvas = () => {
  const stageRef: any = useRef();
  return (
    <Stage
      ref={stageRef}
      options={{ backgroundAlpha: 0 }}
      width={384}
      height={675}
    >
      <Text text="Loading.." />
    </Stage>
  );
};
export default ReelCanvas;
