import { useState } from 'react';
import ReactFlow, { MiniMap, Background, Controls } from 'reactflow';
import 'reactflow/dist/style.css';
import Entity from './components/Entity';

function App() {
  const nodeTypes = {
    entity: Entity,
  };
  const initialNodes = [
    {
      id: crypto.randomUUID(),
      type: 'entity',
      position: {
        x: 100,
        y: 100,
      },
      data: { name: 'Entity' },
    },
  ];

  const [nodes, setNodes] = useState(initialNodes);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow nodeTypes={nodeTypes} nodes={nodes}>
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}

export default App;
