import React from 'react';
import styled from 'styled-components';

const CircleContainer = styled.div`
  position: absolute;
  width: 60px;
  height: 60px;
  transform: translate(${props => props.x}px, ${props => props.y}px);
  transition: transform 0.3s ease-in-out;
  cursor: pointer;
  
  &:hover {
    transform: translate(${props => props.x}px, ${props => props.y}px) scale(1.1);
  }
`;

const Circle = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: ${props => props.color || '#f0f0f0'};
  border: 2px solid ${props => props.color ? props.color : '#e0e0e0'};
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProfileInitial = styled.span`
  font-size: 24px;
  color: #666;
  font-weight: bold;
`;

const ProfileName = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 5px;
  white-space: nowrap;
  font-size: 12px;
  color: #333;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 2px 8px;
  border-radius: 10px;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
  
  ${CircleContainer}:hover & {
    opacity: 1;
  }
`;

const ProfileCircle = ({ name, image, color, x, y }) => {
  return (
    <CircleContainer x={x} y={y}>
      <Circle color={color}>
        {image ? (
          <ProfileImage src={image} alt={name} />
        ) : (
          <ProfileInitial style={{ color: color ? '#fff' : '#666' }}>{name[0]}</ProfileInitial>
        )}
      </Circle>
      <ProfileName>{name}</ProfileName>
    </CircleContainer>
  );
};

export default ProfileCircle;
