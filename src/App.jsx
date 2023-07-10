import { useCallback } from 'react';
import ReactFlow, {
  ConnectionMode,
  addEdge,
  MiniMap,
  Background,
  Controls,
  useEdgesState,
  useNodesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import './App.css';
import Entity from './components/Entity/Entity';
import Toolbar from './components/Toolbar/Toolbar';
import Header, {setDataBaseName} from './components/Header/Header';
import CustomEdge from './components/CustomEdge/CustomEdge';
import createSQLCode from './generateCodeSQL'

const nodeTypes = {
  entity: Entity,
};
const edgeTypes = {
  customEdge: CustomEdge,
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
      name: 'Funcionário',
      attribute: {
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
      x: 700,
      y: 100,
    },
    data: {
      name: 'Setor',
      attribute: {
        nameId: `${crypto.randomUUID()}`,
        typeId: `${crypto.randomUUID()}`,
      },
      foreingKey: {
        nameId: `${crypto.randomUUID()}`,
        typeId: `${crypto.randomUUID()}`,
      },
    },
  },
];
const initialEdges = [
  {
    id: crypto.randomUUID(),
    source: initialNodes[0].id,
    target: initialNodes[1].id,
    type: 'customEdge',
  },
];

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((connection) => {
    const { source, sourceHandle, target, targetHandle } = connection;

    const hasOutgoingEdge = edges.some(
      (edge) =>
        (edge.source === source || edge.source === target) &&
        (edge.target === target || edge.target === source)
    );

    if (hasOutgoingEdge) {
      return;
    }

    const newEdge = {
      id: crypto.randomUUID(),
      source: source,
      target: target,
      sourceHandle: sourceHandle,
      targetHandle: targetHandle,
      type: 'customEdge',
    };
    return setEdges((edges) => addEdge(newEdge, edges));
  });

  function addEntityNode() {
    setNodes((nodes) => [
      ...nodes,
      {
        id: crypto.randomUUID(),
        type: 'entity',
        position: {
          x: 400,
          y: 100,
        },
        data: {
          name: 'Entity',
          attribute: {
            nameId: `${crypto.randomUUID()}`,
            typeId: `${crypto.randomUUID()}`,
          },
          foreingKey: {
            nameId: `${crypto.randomUUID()}`,
            typeId: `${crypto.randomUUID()}`,
          },
        },
      },
    ]);
  }

  function clearWindow() {
    setNodes([])
    setEdges([])
    setDataBaseName("")
  }

  const toolbarButtons = [
    {
      id: 'addNode',
      onClick: addEntityNode,
      content: <img id="image" src='src\images\AddNode.jpeg' />,
    },
    {
      id: 'generateSQL',
      onClick: () => {
        createSQLCode(nodes)
      },
      content: <img id="image" src='src\images\SQLImage.jpeg' />,
    },
    {
      id: 'clear',
      onClick: clearWindow,
      content: <img id="image" src='src\images\LimpezaCache.jpeg' />,
    },
  ];

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        onNodesChange={onNodesChange}
        edgeTypes={edgeTypes}
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
      <Header value={"Dotum"} placeholder={"Entity"} />
      <Toolbar buttons={toolbarButtons}/>
    </div>
  );
}

export default App;
