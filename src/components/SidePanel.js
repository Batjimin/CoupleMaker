import React, { useState } from 'react';
import styled from 'styled-components';

const Panel = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  width: 300px;
  height: 100vh;
  background-color: white;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow-y: auto;
`;

const Title = styled.h2`
  margin: 0;
  color: #333;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: #333;
  font-size: 0.9rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #4CAF50;
  }

  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
`;

const FileInputButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${props => props.disabled ? '#f5f5f5' : '#f0f0f0'};
  color: ${props => props.disabled ? '#999' : '#333'};
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  white-space: nowrap;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background-color: #e8e8e8;
  }
`;

const ImageInputContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const AddButton = styled.button`
  padding: 0.75rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #45a049;
    transform: translateY(-1px);
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
    transform: none;
  }
`;

const ImagePreview = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
  margin-top: 0.5rem;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 12px;
  padding: 0;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }
`;

const PreviewImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const getRandomColor = () => {
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4',
    '#FFEEAD', '#D4A5A5', '#9B59B6', '#3498DB',
    '#E67E22', '#27AE60', '#F1C40F', '#E74C3C'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const Divider = styled.hr`
  width: 100%;
  border: none;
  border-top: 1px solid #eee;
  margin: 1rem 0;
`;

const ProfileList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ProfileItem = styled.div`
  font-size: 0.9rem;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background-color 0.2s;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const DeleteProfileButton = styled.button`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: none;
  background-color: transparent;
  color: #999;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  transition: all 0.2s;
  opacity: 0;
  
  ${ProfileItem}:hover & {
    opacity: 1;
  }

  &:hover {
    background-color: #ff4444;
    color: white;
  }
`;

const SidePanel = ({ onAdd, onDelete, nodes }) => {
  const [name, setName] = useState('');
  const [color, setColor] = useState(getRandomColor());
  const [imageUrl, setImageUrl] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = React.useRef(null);

  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageFile(reader.result);
        setImageUrl('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAdd({
      name,
      color: color || getRandomColor(),
      image: imageFile || imageUrl || ''
    });

    // 폼 초기화
    setName('');
    setColor(getRandomColor());  // 새로운 랜덤 색상으로 초기화
    setImageUrl('');
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Panel>
      <Title>새로운 프로필 추가</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="name">이름 *</Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름을 입력하세요"
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="color">색상 (선택사항)</Label>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Input
              id="color"
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              style={{ width: '35px', height: '35px', padding: '0', cursor: 'pointer' }}
            />
          </div>
        </FormGroup>
        <FormGroup>
          <Label>이미지 (선택사항)</Label>
          <ImageInputContainer>
            <Input
              type="text"
              value={imageUrl}
              onChange={(e) => {
                setImageUrl(e.target.value);
                setImageFile(null);
                if (fileInputRef.current) {
                  fileInputRef.current.value = '';
                }
              }}
              placeholder="이미지 URL을 입력하세요"
              disabled={imageFile !== null}
              style={{ flex: 1 }}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageFileChange}
              ref={fileInputRef}
              style={{ display: 'none' }}
              id="fileInput"
            />
            <FileInputButton
              type="button"
              onClick={() => document.getElementById('fileInput').click()}
              disabled={imageUrl !== ''}
            >
              파일 선택
            </FileInputButton>
          </ImageInputContainer>
          {(imageFile || imageUrl) && (
            <ImagePreview>
              <PreviewImg
                src={imageFile || imageUrl}
                alt="미리보기"
              />
              <DeleteButton
                onClick={() => {
                  setImageFile(null);
                  setImageUrl('');
                  if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                  }
                }}
              >
                ×
              </DeleteButton>
            </ImagePreview>
          )}
        </FormGroup>
        <AddButton type="submit" disabled={!name.trim()}>
          추가
        </AddButton>
      </Form>
      <Divider />
      <ProfileList>
        {nodes.map(node => (
          <ProfileItem key={node.id}>
            <span style={{ color: node.color }}>{node.name}</span>
            <DeleteProfileButton onClick={() => onDelete(node.id)}>×</DeleteProfileButton>
          </ProfileItem>
        ))}
      </ProfileList>
    </Panel>
  );
};

export default SidePanel;
