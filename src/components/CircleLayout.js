import React from 'react';
import styled from 'styled-components';
import ProfileCircle from './ProfileCircle';

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AddButton = styled.button`
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #4CAF50;
  color: white;
  border: none;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease-in-out;
  
  &:hover {
    background-color: #45a049;
    transform: scale(1.1);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const CircleLayout = ({ nodes, radius, onAddNode }) => {
  const calculatePosition = (index, total) => {
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius
    };
  };

  return (
    <Container>
      {nodes.map((node, index) => {
        const { x, y } = calculatePosition(index, nodes.length);
        return (
          <ProfileCircle
            key={node.id}
            name={node.name}
            image={node.image}
            x={x}
            y={y}
          />
        );
      })}
      <AddButton onClick={onAddNode}>+</AddButton>
    </Container>
  );
};

export default CircleLayout;
