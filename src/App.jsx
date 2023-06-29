import { useState } from 'react';
import ReactFlow, {
  MiniMap,
  Background,
  Controls,
  useNodesState,
  Node,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Entity } from './components/Entity';

function App() {
  const [nodes, setNodes] = useNodesState([]);
  const nodeTypes = {
    entity: Entity,
  };

  const initialNodes = [
    {
      id: crypto.randomUUID(),
      type: 'entity',
      position: {
        x: '100px',
        y: '100px',
      },
      data: {},
    },
  ];

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow nodes={initialNodes} nodeTypes={nodeTypes}>
        <Entity name={'Entity'} />
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}

export default App;
