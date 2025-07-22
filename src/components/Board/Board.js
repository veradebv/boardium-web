import React, { useState } from 'react';
import List from '../List/List';
import { DragDropContext } from 'react-beautiful-dnd';
import './Board.css';

const initialBoardData = {
  lists: {
    'list-1': { id: 'list-1', title: 'To Do', cards: ['card-1', 'card-2'] },
    'list-2': { id: 'list-2', title: 'In Progress', cards: [] },
  },
  cards: {
    'card-1': { id: 'card-1', content: 'Set up backend' },
    'card-2': { id: 'card-2', content: 'Design UI' },
  },
  listOrder: ['list-1', 'list-2'],
};

function Board() {
  const [data, setData] = useState(initialBoardData);

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    const sourceList = data.lists[source.droppableId];
    const destList = data.lists[destination.droppableId];

    // Remove from source
    const sourceCards = [...sourceList.cards];
    sourceCards.splice(source.index, 1);

    // Insert into destination
    const destCards = [...destList.cards];
    destCards.splice(destination.index, 0, draggableId);

    setData(prev => ({
      ...prev,
      lists: {
        ...prev.lists,
        [source.droppableId]: { ...sourceList, cards: sourceCards },
        [destination.droppableId]: { ...destList, cards: destCards },
      }
    }));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="board">
        {data.listOrder.map(listId => {
          const list = data.lists[listId];
          const cards = list.cards.map(id => data.cards[id]);
          return <List key={list.id} list={list} cards={cards} />;
        })}
      </div>
    </DragDropContext>
  );
}

export default Board;
