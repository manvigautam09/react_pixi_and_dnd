import { useDrop } from "react-dnd";

const DroppableArea = ({
  children,
  onDrop,
}: {
  children: React.ReactNode;
  onDrop: (id: string, left: number, top: number) => void;
}) => {
  const [, drop] = useDrop(() => ({
    accept: "text",
    drop: (item: any, monitor) => {
      const delta: any = monitor.getDifferenceFromInitialOffset();
      const left = Math.round(item.x + delta.x);
      const top = Math.round(item.y + delta.y);
      onDrop(item.id, left, top);
    },
  }));

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      ref={drop}
    >
      {children}
    </div>
  );
};

export default DroppableArea;
