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
import "./styles/App.css";
import Entity from "./components/Entity";
import Toolbar from "./components/Toolbar";
import Header, { setDataBaseName } from "./components/Header";
import CustomEdge from "./components/CustomEdge";
import createSQLCode from "./generateCodeSQL";

const nodeTypes = {
  entity: Entity,
};
const edgeTypes = {
  customEdge: CustomEdge,
};

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [entitys, setEntitys] = useState([]);

  function updateEntity(newEntity) {
    setEntitys((previewEntitys) => {
      if(previewEntitys.some((previewEntity) => previewEntity.id === newEntity.id)){
        return previewEntitys.map((previewEntity) => {
          if(previewEntity.id === newEntity.id){
            return newEntity;
          } else {
            return previewEntity;
          }
        });
      } else {
        return [...previewEntitys, newEntity];
      }
    });
  }

  function deleteEntity(id) {
    console.log("Log do id recebido pelo deleteEntity " + id);
    const newEntitys = entitys.filter((entity) => entity.id !== id);
    console.log(
      "Log das novas entitys sem o elemento deletado por deleteEntity " +
        newEntitys
    );
    setEntitys(newEntitys);
  }

  const addEntityNode = useCallback(() => {
    const entityId = `entity-${crypto.randomUUID()}`;

    setNodes((nodes) => [
      ...nodes,
      {
        id: crypto.randomUUID(),
        type: "entity",
        position: {
          x: 275,
          y: 200,
        },
        data: {
          name: "Entity",
          updateEntity: (newEntity) => updateEntity(newEntity),
          attribute: {
            nameId: `attribute-name-${entityId}`,
            typeId: `attribute-type-${entityId}`,
          },
          foreignKey: {
            nameId: `foreign-key-name-${entityId}`,
            typeId: `foreign-key-type-${entityId}`,
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
    setEntitys(() => []);
    setNodes(() => []);
    setEdges(() => []);
    setDataBaseName("");
    console.log("Log dos entitys depois do clearWindow " + entitys);
  });

  const toolbarButtons = [
    {
      id: "addNode",
      onClick: addEntityNode,
      content: <img id="image" src="src\images\AddNode.jpeg" />,
    },
    {
      id: "generateSQL",
      onClick: () => {
        createSQLCode(entitys);
      },
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
          onNodesDelete={deleteEntity}
          edgeTypes={edgeTypes}
          edges={edges}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          connectionMode={ConnectionMode.Loose}
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
