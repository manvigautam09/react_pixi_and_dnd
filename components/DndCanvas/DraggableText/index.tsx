import React from "react";
import { useDrag } from "react-dnd";

const DraggableText = ({
  id,
  x,
  y,
  text,
  style,
  showLabel,
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
  showLabel?: boolean;
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
    <div
      style={{
        marginTop: y,
        marginLeft: x,
        minHeight: 36,
      }}
      ref={drag as any}
    >
      {showLabel ? text : ""}
    </div>
  );
};

export default DraggableText;
