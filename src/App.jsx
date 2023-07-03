import { useCallback } from 'react';
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
import Entity from './components/Entity/Entity';
import Toolbar from './components/Toolbar/Toolbar';

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
        id: `${crypto.randomUUID()}`,
        nameId: `${crypto.randomUUID()}`,
        typeId: `${crypto.randomUUID()}`,
      },
      foreingKey: {
        id: `${crypto.randomUUID()}`,
        nameId: `${crypto.randomUUID()}`,
        typeId: `${crypto.randomUUID()}`,
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
        id: `${crypto.randomUUID()}`,
        nameId: `${crypto.randomUUID()}`,
        typeId: `${crypto.randomUUID()}`,
      },
      foreingKey: {
        id: `${crypto.randomUUID()}`,
        nameId: `${crypto.randomUUID()}`,
        typeId: `${crypto.randomUUID()}`,
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
            id: `${crypto.randomUUID()}`,
            nameId: `${crypto.randomUUID()}`,
            typeId: `${crypto.randomUUID()}`,
          },
          foreingKey: {
            id: `${crypto.randomUUID()}`,
            nameId: `${crypto.randomUUID()}`,
            typeId: `${crypto.randomUUID()}`,
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
      <Toolbar onClick={addEntityNode} />
    </div>
  );
}

export default App;
