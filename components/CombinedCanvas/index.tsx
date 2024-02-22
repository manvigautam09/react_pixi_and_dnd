import { Dispatch, SetStateAction, useRef } from "react";
import { Stage, Text } from "@pixi/react";

const CombinedCanvas = ({
  texts,
  setTexts,
}: {
  texts: {
    id: number;
    x: number;
    y: number;
    text: string;
  }[];
  setTexts: Dispatch<
    SetStateAction<
      {
        id: number;
        x: number;
        y: number;
        text: string;
      }[]
    >
  >;
}) => {
  const stageRef: any = useRef();

  return (
    <Stage
      ref={stageRef}
      options={{ backgroundAlpha: 0 }}
      width={384}
      height={675}
    >
      {texts.map((textDetails) => (
        <Text
          key={textDetails.id}
          text={textDetails.text}
          x={textDetails.x}
          y={textDetails.y}
        />
      ))}
    </Stage>
  );
};

export default CombinedCanvas;
