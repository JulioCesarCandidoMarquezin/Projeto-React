import React, { useState } from 'react';
import { getBezierPath, BaseEdge } from 'reactflow';
import './CustomEdge.css';

function EditableEdgeLabel({ x, y }) {
  const [value, setValue] = useState('0:0');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleBlur = () => {
    const [newMin, newMax] = value.split(':');
    onUpdate({ min: newMin, max: newMax });
  };

  return (
    <foreignObject x={x - 25} y={y - 25} width={50} height={50}>
      <input className="input"
        type="text"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
      />
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
      <EditableEdgeLabel x={sourceX} y={sourceY} />
      <EditableEdgeLabel x={targetX} y={targetY} />
    </>
  );
}

export default CustomEdge;
