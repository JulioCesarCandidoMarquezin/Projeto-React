import { useState, useCallback } from 'react';
import ReactFlow, { ConnectionMode, addEdge, applyNodeChanges, applyEdgeChanges, MiniMap, Background, Controls, useEdgesState } from 'reactflow';
import 'reactflow/dist/style.css';
import './App.css'
import Entity from './components/Entity';
import * as Toolbar from '@radix-ui/react-toolbar';

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
    {
      id: crypto.randomUUID(),
      type: 'entity',
      position: {
        x: 600,
        y: 100,
      },
      data: { name: 'Entity', nameId: `${id}+name`, typeId: `${id}+type` },
    }
  ];

function App() {
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [nodes, setNodes, onNodesChange] = useEdgesState(initialNodes)

  const onConnect = useCallback((connection) =>{
    return setEdges(edges => addEdge(connection, edges))
  })

  function addEntityNode() {
    setNodes(nodes => [
      ...nodes, {
        id: crypto.randomUUID(),
          type: 'entity',
          position: {
            x: 400,
            y: 100,
          },
          data: { name: 'Entity' },
      }
    ])
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
      <Toolbar.Root id='toolbar'>
        <Toolbar.Button onClick={addEntityNode}/>
      </Toolbar.Root>
    </div>
  );
}

export default App;
