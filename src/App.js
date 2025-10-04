import React, { useState } from 'react';
import styled from 'styled-components';
import CircleLayout from './components/CircleLayout';

const AppContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #ffffff;
`;

const Node = {
  id: Number,
  name: String,
  image: String,
};

function App() {
  const [nodes, setNodes] = useState([
    { id: 1, name: 'User 1' },
    { id: 2, name: 'User 2' },
    { id: 3, name: 'User 3' },
    { id: 4, name: 'User 4' },
  ]);

  const handleAddNode = () => {
    const newId = nodes.length + 1;
    const newNode = {
      id: newId,
      name: `User ${newId}`,
    };
    setNodes([...nodes, newNode]);
  };

  return (
    <AppContainer>
      <CircleLayout
        nodes={nodes}
        radius={200}
        onAddNode={handleAddNode}
      />
    </AppContainer>
  );
}

export default App;