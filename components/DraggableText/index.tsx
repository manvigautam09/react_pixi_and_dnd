import React, { useCallback, useState } from "react";
import { Text } from "@pixi/react";
import * as PIXI from "pixi.js";

const DraggableText = ({
  text,
  initialX,
  initialY,
  style,
}: {
  text: string;
  initialX: number;
  initialY: number;
  style: object;
}) => {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const onDragStart = useCallback((event: any) => {
    const { x, y } = event.data.global;
    setDragStart({ x, y });
    setIsDragging(true);
  }, []);

  const onDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  const onDragMove = useCallback(
    (event: any) => {
      if (isDragging) {
        const { x, y } = event.data.global;
        setPosition({
          x: position.x + (x - dragStart.x),
          y: position.y + (y - dragStart.y),
        });
        setDragStart({ x, y });
      }
    },
    [isDragging, dragStart, position]
  );

  return (
    <Text
      interactive
      // buttonMode
      anchor={new PIXI.Point(0.5, 0.5)}
      text={text}
      x={position.x}
      y={position.y}
      style={new PIXI.TextStyle(style)}
      onclick={() => {
        console.log("### clicked");
      }}
      pointerdown={onDragStart}
      pointerup={onDragEnd}
      pointerupoutside={onDragEnd}
      pointermove={onDragMove}
    />
  );
};

export default DraggableText;
