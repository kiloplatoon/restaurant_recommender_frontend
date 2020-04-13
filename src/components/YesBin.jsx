import React from "react";
import { useDrop } from "react-dnd";
const style = {
  height: "15rem",
  width: "12rem",
  margin: "1rem",
  color: "white",
  padding: "1rem",
  textAlign: "center",
  fontSize: "2.5rem",
  lineHeight: "12rem",
  fontFamily: "Rochester, cursive",
  float: "right",
};
const YesBin = ({ accept, lastDroppedItem, onDrop }) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept,
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  const isActive = isOver && canDrop;
  let backgroundColor = "#222222d5";
  if (isActive) {
    backgroundColor = "#00a308cc";
  } else if (canDrop) {
    backgroundColor = "#00a308cc";
  }
  return (
    <div ref={drop} className="ynBox" style={{ ...style, backgroundColor }}>
      {isActive ? "Release" : "Yes"}

      {lastDroppedItem && <span>&nbsp;Okay!</span>}
    </div>
  );
};
export default YesBin;
