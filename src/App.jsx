import { useState, useCallback } from 'react';
import ReactFlow, { ConnectionMode, addEdge, applyNodeChanges, applyEdgeChanges, MiniMap, Background, Controls, useEdgesState } from 'reactflow';
import 'reactflow/dist/style.css';
import Entity from './components/Entity';
import { Toolbar } from '@radix-ui/react-toolbar';

function App() {
  const nodeTypes = {
    entity: Entity,
  };
  const initialNodes = [
    {
      id: 'entity1',
      type: 'entity',
      position: {
        x: 100,
        y: 100,
      },
      data: { name: 'Entity 1' },
    },
    {
      id: 'entity2',
      type: 'entity',
      position: {
        x: 600,
        y: 100,
      },
      data: { name: 'Entity 2' },
    }
  ];

  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [nodes, setNodes, onNodesChange] = useEdgesState(initialNodes)

  const onConnect = useCallback((connection) =>{
    return setEdges(edges => addEdge(connection, edges))
  })

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
