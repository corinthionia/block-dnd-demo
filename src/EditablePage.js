import { useState } from 'react';
import EditableBlock from './EditableBlock';
import uid from './utils/uid';
import fetchedData from './data.json';

import styled from 'styled-components';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { AiOutlineHolder } from 'react-icons/ai';

const EditPage = () => {
  // const initialBlock = { id: uid(), html: '', tag: 'p', flag: 'false' };
  const [blocks, setBlocks] = useState(fetchedData);

  const updatePageHandler = (updatedBlock) => {
    const index = blocks.map((b) => b.id).indexOf(updatedBlock.id);
    const updatedBlocks = [...blocks];
    updatedBlocks[index] = {
      ...updatedBlocks[index],
      tag: updatedBlock.tag,
      html: updatedBlock.html,
      flag: updatedBlock.flag,
    };
    setBlocks(updatedBlocks);
  };

  const addBlockHandler = (currentBlock) => {
    const newBlock = { id: uid(), html: '', tag: 'p', flag: 'false' };
    const index = blocks.map((b) => b.id).indexOf(currentBlock.id);
    const updatedBlocks = [...blocks];
    updatedBlocks.splice(index + 1, 0, newBlock);
    setBlocks(updatedBlocks);
    // this.setState({ blocks: updatedBlocks }, () => {
    //   currentBlock.ref.nextElementSibling.focus();
    // });
  };

  const deleteBlockHandler = (currentBlock) => {
    const previousBlock = currentBlock.ref.previousElementSibling;
    if (previousBlock) {
      const index = blocks.map((b) => b.id).indexOf(currentBlock.id);
      const updatedBlocks = [...blocks];
      updatedBlocks.splice(index, 1);
      setBlocks(updatedBlocks);
      // this.setState({ blocks: updatedBlocks }, () => {
      //   setCaretToEnd(previousBlock);
      //   previousBlock.focus();
      // });
    }
  };

  const updateBlockHandler = (currentBlock) => {
    const { startPoint, endPoint } = currentBlock;
    const targetHtml = currentBlock.html;
    // 쪼개지는 범위에 따라 빈 string에 대한 핸들링 필요
    const prevHtml = targetHtml.substring(0, startPoint);
    const newHtml = targetHtml.substring(startPoint, endPoint);
    const nextHtml = targetHtml.substring(endPoint);
    const updatedBlocks = [...blocks];
    // console.log(prevHtml);
    // console.log(newHtml);
    // console.log(nextHtml);

    const index = blocks.map((b) => b.id).indexOf(currentBlock.id);

    if (prevHtml.length === 0 && nextHtml.length === 0) {
      //just update that index
      console.log('case1');
      updatedBlocks[index] = {
        ...updatedBlocks[index],
        flag: 'true',
      };
    } else if (prevHtml.length === 0 && nextHtml.length !== 0) {
      //new -> index, next -> next
      console.log('case2');
      console.log(nextHtml.length);
      updatedBlocks[index] = {
        ...updatedBlocks[index],
        flag: 'true',
        html: newHtml,
      };
      const newBlock = { id: uid(), html: nextHtml, tag: 'p', flag: 'false' };
      updatedBlocks.splice(index + 1, 0, newBlock);
    } else if (prevHtml.length !== 0 && nextHtml.length === 0) {
      // prev -> index, new -> next
      console.log('case3');
      updatedBlocks[index] = {
        ...updatedBlocks[index],
        html: prevHtml,
      };
      const newBlock = { id: uid(), html: newHtml, tag: 'p', flag: 'true' };
      updatedBlocks.splice(index + 1, 0, newBlock);
    } else if (prevHtml.length !== 0 && nextHtml.length !== 0) {
      // update all
      console.log('case4');
      updatedBlocks[index] = { ...updatedBlocks[index], html: prevHtml };
      const newBlock = { id: uid(), html: newHtml, tag: 'p', flag: 'true' };
      updatedBlocks.splice(index + 1, 0, newBlock);
      const nextBlock = { id: uid(), html: nextHtml, tag: 'p', flag: 'false' };
      updatedBlocks.splice(index + 2, 0, nextBlock);
    }
    setBlocks(updatedBlocks);
  };

  const handleDndChange = (result) => {
    if (!result.destination) return;

    const items = [...blocks];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setBlocks(items);
    console.log(items);
  };

  return (
    <DragDropContext onDragEnd={handleDndChange}>
      <Droppable droppableId="todosDroppable">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '450px',
              minHeight: '580px',
              margin: '24px',
              paddingTop: '24px',
              border: '1px solid black',
              borderRadius: '2px',
              backgroundColor: '#ffffff',
            }}
          >
            {blocks.map(({ id, tag, html, flag }, index) => (
              <Draggable key={id} draggableId={id} index={index}>
                {(provided) => (
                  <Wrapper
                    ref={provided.innerRef}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    key={id}
                  >
                    <DragBtn>
                      <AiOutlineHolder />
                    </DragBtn>
                    <EditableBlock
                      id={id}
                      tag={tag}
                      html={html}
                      flag={flag}
                      updatePage={updatePageHandler}
                      addBlock={addBlockHandler}
                      deleteBlock={deleteBlockHandler}
                      updateBlock={updateBlockHandler}
                    />
                  </Wrapper>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

const DragBtn = styled.div`
  height: 100%;
  margin-left: 10px; ;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export default EditPage;
