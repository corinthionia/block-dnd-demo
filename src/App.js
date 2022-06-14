import { createElement, useState } from 'react';
import styled from 'styled-components';
import data from './data.json';

function App() {
  const [inputText, setInputText] = useState('');

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const div = createElement('div', null, 'React.createElement 테스트 블럭');

  return (
    <Wrapper>
      <Editor
        contentEditable={true}
        suppressContentEditableWarning={true}
        value={inputText}
        onChange={handleInputChange}
      >
        {data.text && <div dangerouslySetInnerHTML={{ __html: data.text }} />}
        {div}
      </Editor>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Editor = styled.div`
  width: 400px;
  height: 700px;
  padding: 20px;
  outline: none;

  background: #f5f8ff;
  border-radius: 4px;

  div {
    padding: 2px;
    /* background: pink; */
    margin-top: 2px;
    border: 1px solid black;
  }
`;

export default App;
