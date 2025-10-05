import React, { useState } from 'react';
import styled from 'styled-components';
import CircleLayout from './components/CircleLayout';
import SidePanel from './components/SidePanel';

const AppContainer = styled.div`
  width: calc(100% - 300px);
  height: 100vh;
  background-color: #ffffff;
`;

const Node = {
  id: Number,
  name: String,
  image: String,
};

function App() {
  const [nodes, setNodes] = useState([]);

  const handleAddNode = (nodeData) => {
    const newId = nodes.length + 1;
    const newNode = {
      id: newId,
      name: nodeData.name,
      color: nodeData.color,
      image: nodeData.image,
    };
    setNodes([...nodes, newNode]);
  };

  const handleDeleteNode = (id) => {
    setNodes(nodes.filter(node => node.id !== id));
  };

  return (
    <>
      <AppContainer>
        <CircleLayout
          nodes={nodes}
          radius={200}
        />
      </AppContainer>
      <SidePanel onAdd={handleAddNode} onDelete={handleDeleteNode} nodes={nodes} />
    </>
  );
}

export default App;