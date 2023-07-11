import { useCallback, useState } from "react";
import ReactFlow, {
  ConnectionMode,
  addEdge,
  MiniMap,
  Background,
  Controls,
  useEdgesState,
  useNodesState,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";
import "./App.css";
import Entity from "./components/Entity/Entity";
import Toolbar from "./components/Toolbar/Toolbar";
import Header, { setDataBaseName } from "./components/Header/Header";
import CustomEdge from "./components/CustomEdge/CustomEdge";
import createSQLCode from "./generateCodeSQL";

const nodeTypes = {
  entity: Entity,
};
const edgeTypes = {
  customEdge: CustomEdge,
};
const initialNodes = [
  {
    id: crypto.randomUUID(),
    type: "entity",
    position: {
      x: 100,
      y: 100,
    },
    data: {
      name: "Funcionário",
      childToParent: () => {},
      attribute: {
        nameId: `${crypto.randomUUID()}`,
        typeId: `${crypto.randomUUID()}`,
      },
      foreignKey: {
        id: `${crypto.randomUUID()}`,
        nameId: `${crypto.randomUUID()}`,
        typeId: `${crypto.randomUUID()}`,
      },
    },
  },
  {
    id: crypto.randomUUID(),
    type: "entity",
    position: {
      x: 700,
      y: 100,
    },
    data: {
      name: "Setor",
      childToParent: () => {},
      attribute: {
        nameId: `${crypto.randomUUID()}`,
        typeId: `${crypto.randomUUID()}`,
      },
      foreignKey: {
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
    type: "customEdge",
  },
];

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [entitys, setEntitys] = useState([]);

  function childToParent(childData) {
    setEntitys([...entitys, childData])
  }

  const addEntityNode = useCallback(() => {
    setNodes((nodes) => [
      ...nodes,
      {
        id: crypto.randomUUID(),
        type: "entity",
        position: {
          x: 400,
          y: 100,
        },
        data: {
          name: "Entity",
          childToParent: childToParent,
          attribute: {
            nameId: `${crypto.randomUUID()}`,
            typeId: `${crypto.randomUUID()}`,
          },
          foreignKey: {
            nameId: `${crypto.randomUUID()}`,
            typeId: `${crypto.randomUUID()}`,
          },
        },
      },
    ]);
  });

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
      type: "customEdge",
    };
    return setEdges((edges) => addEdge(newEdge, edges));
  });

  const clearWindow = useCallback(() => {
    setNodes([]);
    setEdges([]);
    setDataBaseName("");
  });

  const toolbarButtons = [
    {
      id: "addNode",
      onClick: addEntityNode,
      content: <img id="image" src="src\images\AddNode.jpeg" />,
    },
    {
      id: "generateSQL",
      onClick: () => createSQLCode(entitys),
      content: <img id="image" src="src\images\SQLImage.jpeg" />,
    },
    {
      id: "clear",
      onClick: clearWindow,
      content: <img id="image" src="src\images\LimpezaCache.jpeg" />,
    },
  ];

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlowProvider>
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
          <MiniMap nodeColor={"#2b2d42"} />
        </ReactFlow>
        <Header value={"Dotum"} placeholder={"Entity"} />
        <Toolbar buttons={toolbarButtons} />
      </ReactFlowProvider>
    </div>
  );
}

export default App;
