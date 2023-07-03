import { useState, useCallback } from 'react';
import ReactFlow, {
  ConnectionMode,
  addEdge,
  MiniMap,
  Background,
  Controls,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import './App.css';
import Entity from './components/Entity';

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
    data: {
      name: 'Entity',
      attribute: {
        nameId: `+nameAttribute`,
        typeId: `+typeAttribute`,
      },
      foreingkey: {
        nameId: `+nameForeingKey`,
        typeId: `+typeForeingKey`,
      },
    },
  },
  {
    id: crypto.randomUUID(),
    type: 'entity',
    position: {
      x: 600,
      y: 100,
    },
    data: {
      name: 'Entity',
      attribute: {
        nameId: `+nameAttribute`,
        typeId: `+typeAttribute`,
      },
      foreingkey: {
        nameId: `+nameForeingKey`,
        typeId: `+typeForeingKey`,
      },
    },
  },
];

function App() {
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [nodes, setNodes, onNodesChange] = useEdgesState(initialNodes);

  const onConnect = useCallback((connection) => {
    return setEdges((edges) => addEdge(connection, edges));
  });

  function addEntityNode() {
    setNodes((nodes) => [
      ...nodes,
      {
        id: crypto.randomUUID(),
        type: 'entity',
        position: {
          x: 600,
          y: 100,
        },
        data: {
          name: 'Entity',
          attribute: {
            nameId: `+nameAttribute`,
            typeId: `+typeAttribute`,
          },
          foreingkey: {
            nameId: `+nameForeingKey`,
            typeId: `+typeForeingKey`,
          },
        },
      },
    ]);
  }

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        connectionMode={ConnectionMode.Loose}
        fitView={true}
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}

export default App;
