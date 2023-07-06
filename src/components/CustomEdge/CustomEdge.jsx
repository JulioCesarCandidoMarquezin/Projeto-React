import React, { useState } from 'react';
import { getBezierPath, BaseEdge } from 'reactflow';
import './CustomEdge.css';

export let valueEdges

function EdgeLabel({ x, y }) {
  const [value, setValue] = useState('1:1');
  valueEdges = value

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <foreignObject
      className="foreignObject"
      x={x - 25}
      y={y - 25}
      width={70}
      height={70}
    >
      <select className="select" value={value} onChange={handleChange}>
        <option value="1:1">1:1</option>
        <option value="1:N">1:N</option>
        <option value="N:1">N:1</option>
        <option value="N:N">N:N</option>
      </select>
    </foreignObject>
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
      <BaseEdge id={id} path={edgePath} />
      <EdgeLabel x={sourceX} y={sourceY} />
      <EdgeLabel x={targetX} y={targetY} />
    </>
  );
}

export default CustomEdge;
