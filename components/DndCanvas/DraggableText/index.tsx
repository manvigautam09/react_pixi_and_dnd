import React from "react";
import { useDrag } from "react-dnd";

const DraggableText = ({
  id,
  x,
  y,
  text,
  style,
}: {
  id: string;
  x: number;
  y: number;
  text: string;
  style: {
    fontFamily: string;
    fontSize: number;
    fill: string;
  };
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
    <div style={{ marginTop: y, marginLeft: x }} ref={drag as any}>
      {text}
    </div>
  );
};

export default DraggableText;
