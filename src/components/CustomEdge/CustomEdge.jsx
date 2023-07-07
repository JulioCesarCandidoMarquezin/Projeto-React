import React, { useState } from "react";
import { getBezierPath, BaseEdge } from "reactflow";
import "./CustomEdge.css";

function EdgeLabel({ sourceX, sourceY, targetX, targetY }) {
  // contar o tanto de arestas pra advinhar o relacionamento
  const [value, setValue] = useState({ source: "1:1", target: "1:1" });

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <>
      <foreignObject
        className="foreignObject"
        x={sourceX - 25}
        y={sourceY - 25}
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
        x={targetX - 25}
        y={targetY - 25}
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
      <BaseEdge id={id} path={edgePath} />
      <EdgeLabel sourceX={sourceX} sourceY={sourceY} targetX={targetX} targetY={targetY}/>
    </>
  );
}

export default CustomEdge;
