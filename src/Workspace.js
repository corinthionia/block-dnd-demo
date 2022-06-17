import _ from 'lodash';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import drag from './drag.png';

const Workspace = ({ data, setData }) => {
  const [prevKey, setPrevKey] = useState('');
  console.log('컴포넌트 렌더링');
  const ref = useRef();

  const handleKeyDown = async (e) => {
    console.log('keydown 함수 렌더링');
    setPrevKey(e.key);

    if (
      (prevKey !== 'Shift') &
      (e.key === 'Enter') &
      (e.nativeEvent.isComposing === false)
    ) {
      // prevent creating new lines
      e.preventDefault();
      console.log('if문 안 렌더링');
      ref.current = e.target.id;

      const idx = data.blocks.findIndex(
        (block) => block.blockId === parseInt(e.target.id)
      );

      const newT = _.cloneDeep(data);

      await newT.blocks.splice(idx + 1, 0, {
        blockId: Date.now(),
        text: '',
        isBlocked: false,
      });

      setData(newT);
      console.log('블럭 추가!');

      const el = document.getElementById(ref.current);
      const range = document.createRange();
      const selection = window.getSelection();

      range.setStart(el?.nextElementSibling.childNodes[1], 0);
      selection.removeAllRanges();
      selection.addRange(range);

      setPrevKey('');
    }
  };

  const getBlockText = (e) => {
    // get block values with html tags
    // console.log(e.target.innerHTML);
  };

  return (
    <Wrapper>
      <Editor onKeyDown={handleKeyDown}>
        <BlockWrapper draggable={true}>
          <DragIcon src={drag} alt="" draggable={false} />
          <Block
            className="blocks"
            id={Date.now()}
            onClick={getBlockText}
            contentEditable={true}
            suppressContentEditableWarning={true}
          />
        </BlockWrapper>

        {data.blocks.map(({ blockId, text }) => {
          return (
            <BlockWrapper key={blockId} draggable={true} id={blockId}>
              <DragIcon src={drag} alt="" />
              <Block
                className="blocks"
                id={blockId}
                onClick={getBlockText}
                draggable={false}
                contentEditable={true}
                suppressContentEditableWarning={true}
                dangerouslySetInnerHTML={{ __html: text }}
              />
            </BlockWrapper>
          );
        })}
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
  align-items: center;
`;

const Block = styled.div`
  padding: 4px;
  min-height: 20px;
  background: rgba(82, 116, 239, 0.15);
  margin-top: 2px;
  border: 1px solid #5274ef;
  border-radius: 2px;
  width: 100%;
  outline: none;

  font-size: 14px;
  line-height: 150%;
  letter-spacing: -0.005em;
`;

const DragIcon = styled.img`
  height: 16px;
  cursor: pointer;
  margin-right: 4px;
`;

export default Workspace;
