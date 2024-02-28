import * as PIXI from "pixi.js";
import { Text } from "@pixi/react";

import { TextType } from "@/utils/types";
import { Fragment, useCallback, useState } from "react";

interface TextLayerProps {
  textDetails: TextType[];
}

const TextComponent = ({ t }: { t: TextType }) => {
  const [position, setPosition] = useState({
    x: t.position?.x || 100,
    y: t.position?.y || 100,
  });
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
      text={t.title}
      x={position.x}
      y={position.y}
      style={
        new PIXI.TextStyle({
          align: t.style?.align || "center",
          fontFamily:
            t.style?.fontFamily || '"Source Sans Pro", Helvetica, sans-serif',
          fontSize: t.style?.fontSize || 20,
          fontWeight: t.style?.fontWeight || "400",
          fill: t.style?.fill || "#000", // can also add gradient
          stroke: t.style?.stroke || "#000",
          strokeThickness: t.style?.strokeThickness || 0,
          letterSpacing: t.style?.letterSpacing || 1,
          dropShadow: t.style?.dropShadow || false,
          dropShadowColor: t.style?.dropShadowColor || "#000",
          dropShadowBlur: t.style?.dropShadowBlur || 4,
          dropShadowAngle: t.style?.dropShadowAngle || Math.PI / 6,
          dropShadowDistance: t.style?.dropShadowDistance || 10,
          wordWrap: t.style?.wordWrap || true,
          wordWrapWidth: t.style?.wordWrapWidth || 440,
        })
      }
      pointerdown={onDragStart}
      pointerup={onDragEnd}
      pointerupoutside={onDragEnd}
      pointermove={onDragMove}
      angle={t.rotate || 0}
    />
  );
};

const TextLayer = ({ textDetails }: TextLayerProps) => {
  return (
    <Fragment>
      {textDetails.map((t) => (
        <TextComponent key={t.id} t={t} />
      ))}
    </Fragment>
  );
};

export default TextLayer;
