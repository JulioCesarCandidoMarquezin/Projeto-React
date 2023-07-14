import React, { useState, useEffect } from "react";
import { getBezierPath, BaseEdge } from "reactflow";
import "./../styles/CustomEdge.css";

const calculateSelectPosition = (position, otherPosition, positionType) => {
  const minDistance = 10;
  const maxDistanceRatio = 0.1;

  let selectPosition;

  const diffX = otherPosition.x - position.x;
  const diffY = otherPosition.y - position.y;

  switch (positionType) {
    case "top":
      selectPosition = {
        x:
          diffX < 0
            ? position.x - 35 - Math.abs(diffX) * maxDistanceRatio
            : position.x - 35 + Math.abs(diffX) * maxDistanceRatio,
        y:
          position.y -
          Math.max(minDistance, Math.abs(diffY) * maxDistanceRatio) -
          25,
      };
      break;
    case "bottom":
      selectPosition = {
        x:
          diffX < 0
            ? position.x - 35 - Math.abs(diffX) * maxDistanceRatio
            : position.x - 35 + Math.abs(diffX) * maxDistanceRatio,
        y:
          position.y +
          Math.max(minDistance, Math.abs(diffY) * maxDistanceRatio),
      };
      break;
    case "left":
      selectPosition = {
        x:
          position.x -
          Math.max(minDistance, Math.abs(diffX) * maxDistanceRatio) -
          70,
        y:
          diffY < 0
            ? position.y - 15 - Math.abs(diffY) * maxDistanceRatio
            : position.y - 15 + Math.abs(diffY) * maxDistanceRatio,
      };
      break;
    case "right":
      selectPosition = {
        x:
          position.x +
          Math.max(minDistance, Math.abs(diffX) * maxDistanceRatio),
        y:
          diffY < 0
            ? position.y - 15 - Math.abs(diffY) * maxDistanceRatio
            : position.y - 15 + Math.abs(diffY) * maxDistanceRatio,
      };
      break;
    default:
      break;
  }

  return selectPosition;
};

function EdgeLabel({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
}) {
  const [value, setValue] = useState({ source: "1:1", target: "1:1" });

  const handleChange = (event) => {
    setValue({ ...value, [event.target.name]: event.target.value });
  };

  const sourcePositionMap = { x: sourceX, y: sourceY };
  const targetPositionMap = { x: targetX, y: targetY };

  const selectSourcePosition = calculateSelectPosition(
    sourcePositionMap,
    targetPositionMap,
    sourcePosition
  );
  const selectTargetPosition = calculateSelectPosition(
    targetPositionMap,
    sourcePositionMap,
    targetPosition
  );

  return (
    <>
      <foreignObject
        key={`source-foreignObject-${id}`}
        className="foreignObject"
        x={selectSourcePosition.x}
        y={selectSourcePosition.y}
        width={70}
        height={70}
      >
        <select
          key={`source-select-${id}`}
          className="select"
          name="source"
          value={value.source}
          onChange={handleChange}
        >
          <option value="1:1">1:1</option>
          <option value="1:N">1:N</option>
          <option value="N:N">N:N</option>
        </select>
      </foreignObject>

      <foreignObject
        key={`target-foreignObject-${id}`}
        className="foreignObject"
        x={selectTargetPosition.x}
        y={selectTargetPosition.y}
        width={70}
        height={70}
      >
        <select
          key={`target-select-${id}`}
          className="select"
          name="target"
          value={value.target}
          onChange={handleChange}
        >
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
    id,
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <BaseEdge id={id} path={edgePath} />
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
