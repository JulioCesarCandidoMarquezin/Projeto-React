import { useState } from 'react';
import ReactFlow, { Background, Controls } from 'reactflow';
import 'reactflow/dist/style.css';
import Entity from './components/Entity';

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow>
        <Entity name={'Entity'} />
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default App;
