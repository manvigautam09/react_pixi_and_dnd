import React from "react";
import { Text } from "@pixi/react";
import { useDrag } from "react-dnd";

const DraggableText = ({
  id,
  x,
  y,
  text,
}: {
  id: string;
  x: number;
  y: number;
  text: string;
}) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "text",
      item: { id, x, y },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [id, x, y]
  ); // Depend on id, x, and y to recreate the drag item when they change

  return (
    // <div style={{ marginTop: y, marginLeft: x }} ref={drag as any}>
    //   {text}
    // </div>
    <Text
      ref={drag as any} // Assign the drag source connector to the ref
      text={text}
      x={x}
      y={y}
      alpha={isDragging ? 0.5 : 1}
      // style={new PIXI.TextStyle(style)}
    />
  );
};

export default DraggableText;
