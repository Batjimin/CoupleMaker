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


const CircleLayout = ({ nodes, radius }) => {
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
            color={node.color}
            x={x}
            y={y}
          />
        );
      })}
    </Container>
  );
};

export default CircleLayout;
