import _ from 'lodash';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { css } from 'styled-components';
import drag from './drag.png';

const Workspace = ({ data, setData }) => {
  const [prevKey, setPrevKey] = useState('');
  const [isNewBlockAdded, setIsNewBlockAdded] = useState(false);
  const ref = useRef();
  const refX = useRef();
  const refY = useRef();

  const addNewBlock = async ({ textValue }) => {
    const idx = data.blocks.findIndex(
      (block) => block.blockId === parseInt(ref.current)
    );

    // 일단 임시로 lodash 사용... 나중에 uninstall 할 예정...
    const newData = _.cloneDeep(data);

    await newData.blocks.splice(idx + 1, 0, {
      blockId: Date.now(),
      text: textValue,
      isBlocked: false,
    });

    setData(newData);
  };

  const handleKeyDown = (e) => {
    setPrevKey(e.key);

    if (
      (prevKey !== 'Shift') &
      (e.key === 'Enter') &
      (e.nativeEvent.isComposing === false)
    ) {
      // prevent creating new lines
      e.preventDefault();
      ref.current = e.target.id;

      // const idx = data.blocks.findIndex(
      //   (block) => block.blockId === parseInt(e.target.id)
      // );

      // // 일단 임시로 lodash 사용... 나중에 uninstall 할 예정...
      // const newData = _.cloneDeep(data);

      // await newData.blocks.splice(idx + 1, 0, {
      //   blockId: Date.now(),
      //   text: '',
      //   isBlocked: false,
      // });

      // setData(newData);

      addNewBlock('');
      setIsNewBlockAdded(true);
      console.log('블럭 추가!');
    }
  };

  const handleDragText = (e) => {
    // get block values with html tags
    const sel = document.getSelection();

    // get dragged text element
    console.log(e.target.innerHTML.slice(sel.anchorOffset, sel.focusOffset));

    console.log(e.pageX, e.pageY);
    refX.current = e.pageX;
    refY.current = e.pageY;
  };

  const handleFloatingBtnClick = (e) => {
    console.log(e);
  };

  useEffect(() => {
    if (isNewBlockAdded) {
      const el = document.getElementById(ref.current);
      const range = document.createRange();
      const selection = window.getSelection();
      range.setStart(el?.nextElementSibling.childNodes[1], 0);
      selection.removeAllRanges();
      selection.addRange(range);

      setIsNewBlockAdded(false);
    }
  }, [isNewBlockAdded]);

  return (
    <Wrapper>
      <Editor onKeyDown={handleKeyDown}>
        {data.blocks.map(({ blockId, text, isBlocked }) => {
          return (
            <BlockWrapper key={blockId} draggable={true} id={blockId}>
              <DragIcon src={drag} alt="" />
              <Block
                id={blockId}
                onClick={handleDragText}
                isBlocked={isBlocked}
                draggable={false}
                contentEditable={true}
                suppressContentEditableWarning={true}
              >
                {text}
              </Block>
            </BlockWrapper>
          );
        })}
        <FloatingBtn onClick={handleFloatingBtnClick}>블록 만들기</FloatingBtn>
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
  background: none;
`;

const Block = styled.div`
  padding: 4px;
  min-height: 20px;
  margin-top: 2px;
  border-radius: 2px;
  width: 100%;
  outline: none;

  font-size: 14px;
  line-height: 150%;
  letter-spacing: -0.005em;

  white-space: pre-wrap;

  ${({ isBlocked }) =>
    isBlocked &&
    css`
      background: rgba(82, 116, 239, 0.15);
      border: 1px solid #5274ef;
    `}

  ::selection {
    background: #cbe5f3;
  }
`;

const DragIcon = styled.img`
  width: 8px;
  height: 15px;
  cursor: grab;
  margin-right: 4px;
  padding: 5px;
  background: none;
  border-radius: 2px;
  &:hover {
    background: #e9ecef;
    padding: 5px;
  }
`;

const FloatingBtn = styled.div`
  width: 75px;
  height: 28px;
  border-radius: 4px;
  background: #f5f8ff;
  box-shadow: 0px 0px 10px #5c7cfa;

  font-weight: 400;
  font-size: 12px;
  line-height: 20px;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  /* z-index: 2; */
  /* 
  position: absolute;
  // left: -40px top: +20px 적당 (창 크기 따라 달라짐 ㅠㅠ)
  left: 208px;
  top: 199px; */

  /* 
  ${({ refX, refY }) =>
    refX & refY &&
    css`
      left: ${refX};
      top: ${refY};
    `} */
`;

export default Workspace;
