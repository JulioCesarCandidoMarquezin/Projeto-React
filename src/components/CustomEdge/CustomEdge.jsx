import React, { useState } from 'react';
import { getBezierPath, EdgeLabelRenderer, BaseEdge } from 'reactflow';

function EdgeLabel({ transform }) {
  const [value, setValue] = useState('0:0');

  return (
    <div
      style={{
        position: 'absolute',
        background: 'transparent',
        padding: 10,
        color: '#ff5050',
        fontSize: 12,
        fontWeight: 700,
        transform,
      }}
    >
      <input
        defaultValue={value}
        onChange={setValue}
        style={{ width: '50px' }}
      />
    </div>
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
      <EdgeLabelRenderer>
        <EdgeLabel
          transform={`translate(-100%, -100%) translate(${sourceX}px,${sourceY}px)`}
        />
        <EdgeLabel
          transform={`translate(0%, -100%) translate(${targetX}px,${targetY}px)`}
        />
      </EdgeLabelRenderer>
    </>
  );
}

export default CustomEdge;
