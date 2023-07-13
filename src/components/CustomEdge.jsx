import React, { useState, useEffect } from "react";
import { getBezierPath, BaseEdge } from "reactflow";
import "./../styles/CustomEdge.css";

function verifyHandlePostion() {

}

function EdgeLabel({
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
}) {
  const [value, setValue] = useState({ source: "1:1", target: "1:1" });

  const getSelectOffsetX = (position) => {
    switch (position) {
      case "left":
        return -70;
      case "right":
        return 0;
      default:
        return 0;
    }
  };

  const getSelectOffsetY = (position) => {
    switch (position) {
      case "top":
        return -30;
      case "bottom":
        return 5;
      default:
        return -15;
    }
  };

  const selectPositions = {
    source: {
      x: sourceX + getSelectOffsetX(sourcePosition),
      y: sourceY + getSelectOffsetY(sourcePosition),
    },
    target: {
      x:  targetX + getSelectOffsetX(targetPosition),
      y: targetY + getSelectOffsetY(targetPosition),
    },
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <>
      <foreignObject
        className="foreignObject"
        x={selectPositions.source.x}
        y={selectPositions.source.y}
        width={70}
        height={70}
      >
        <select className="select" value={value.source} onChange={handleChange}>
          <option value="1:1">1:1</option>
          <option value="1:N">1:N</option>
          <option value="N:N">N:N</option>
        </select>
      </foreignObject>

      <foreignObject
        className="foreignObject"
        x={selectPositions.target.x}
        y={selectPositions.target.y}
        width={70}
        height={70}
      >
        <select className="select" value={value.target} onChange={handleChange}>
          <option value="1:1">1:1</option>
          <option value="1:N">1:N</option>
          <option value="N:N">N:N</option>
        </select>
      </foreignObject>
    </>
  );
}

function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
}) {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <BaseEdge id={id} path={edgePath}/>
      <EdgeLabel
        key={`${id}-label`} 
        sourceX={sourceX}
        sourceY={sourceY}
        targetX={targetX}
        targetY={targetY}
        sourcePosition={sourcePosition}
        targetPosition={targetPosition}
      />
    </>
  );
}

export default CustomEdge;
