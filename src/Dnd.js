import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useState } from 'react';
import styled from 'styled-components';

const Dnd = () => {
  const [todos, setTodos] = useState([
    { id: '1', title: '공부' },
    { id: '2', title: '헬스' },
    { id: '3', title: '독서' },
    { id: '4', title: '산책' },
    { id: '5', title: '요리' },
  ]);

  const handleDndChange = (result) => {
    if (!result.destination) return;

    const items = [...todos];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTodos(items);
  };

  return (
    <DragDropContext onDragEnd={handleDndChange}>
      <Droppable droppableId="todosDroppable">
        {(provided) => (
          <Wrapper {...provided.droppableProps} ref={provided.innerRef}>
            {todos.map(({ id, title }, index) => (
              <Draggable key={id} draggableId={id} index={index}>
                {(provided) => (
                  <Block
                    ref={provided.innerRef}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                  >
                    {title}
                  </Block>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </Wrapper>
        )}
      </Droppable>
    </DragDropContext>
  );
};

const Wrapper = styled.div`
  width: 200px;
  height: 500px;
  background: pink;
`;

const Block = styled.div`
  width: 200px;
  height: 75px;
  margin-bottom: 10px;
  background: powderblue;
`;

export default Dnd;
