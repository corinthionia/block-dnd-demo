import { useState } from 'react';
import styled from 'styled-components';
import drag from './drag.png';

const Workspace = ({ data, setData }) => {
  const [prevKey, setPrevKey] = useState('');

  const handleKeyDown = (e) => {
    setPrevKey(e.key);

    if ((prevKey === 'Shift') & (e.key === 'Enter')) {
      const newData = {
        ...data,
        blocks: [
          ...data.blocks,
          { blockId: Date.now(), text: '제발 ㅠㅠ', isBlocked: true },
        ],
      };

      setData(newData);
    }
  };

  console.log('렌더링!');

  return (
    <Wrapper>
      <Editor>
        {data.blocks.map(({ blockId, text, isBlocked }) => {
          return (
            isBlocked && (
              <BlockWrapper key={blockId} draggable={true}>
                <DragIcon src={drag} alt="" draggable={false} />
                <Block
                  onKeyDown={handleKeyDown}
                  className="blocks"
                  draggable={false}
                  contentEditable={true}
                  suppressContentEditableWarning={true}
                  dangerouslySetInnerHTML={{ __html: text }}
                />
              </BlockWrapper>
            )
          );
        })}
        <BlockWrapper>
          <DragIcon src={drag} alt="" draggable={false} />
          <Block contentEditable={true} suppressContentEditableWarning={true} />
        </BlockWrapper>
      </Editor>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Editor = styled.div`
  width: 400px;
  min-height: 700px;
  padding: 20px;
  outline: none;

  background: #f5f8ff;
  border-radius: 4px;
`;

const BlockWrapper = styled.div`
  width: 100%;

  display: flex;
`;

const Block = styled.div`
  padding: 2px;
  min-height: 20px;
  background: pink;
  margin-top: 2px;
  border: 1px solid black;
  width: 100%;
  outline: none;
`;

const DragIcon = styled.img`
  height: 20px;
  cursor: pointer;
`;

export default Workspace;
