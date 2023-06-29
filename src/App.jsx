import { useState } from 'react';
import ReactFlow, { Background, Controls } from 'reactflow';
import 'reactflow/dist/style.css';
import Entitie from './components/Entitie';

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow>
        
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default App;
