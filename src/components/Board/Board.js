import React, { useState } from 'react';
import List from '../List/List';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
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
  const [newListTitle, setNewListTitle] = useState('');

  const onDragEnd = (result) => {
    const { source, destination, draggableId, type } = result;
    if (!destination) return;

    if (type === 'list') {
      const newListOrder = Array.from(data.listOrder);
      newListOrder.splice(source.index, 1);
      newListOrder.splice(destination.index, 0, draggableId);
      setData(prev => ({ ...prev, listOrder: newListOrder }));
      return;
    }

    const sourceList = data.lists[source.droppableId];
    const destList = data.lists[destination.droppableId];

    if (sourceList === destList) {
      const newCards = Array.from(sourceList.cards);
      newCards.splice(source.index, 1);
      newCards.splice(destination.index, 0, draggableId);
      setData(prev => ({
        ...prev,
        lists: { ...prev.lists, [sourceList.id]: { ...sourceList, cards: newCards } }
      }));
      return;
    }

    const sourceCards = Array.from(sourceList.cards);
    sourceCards.splice(source.index, 1);
    const destCards = Array.from(destList.cards);
    destCards.splice(destination.index, 0, draggableId);
    setData(prev => ({
      ...prev,
      lists: {
        ...prev.lists,
        [sourceList.id]: { ...sourceList, cards: sourceCards },
        [destList.id]: { ...destList, cards: destCards },
      }
    }));
  };

  const addCard = async (listId, content) => {
    if (!content.trim()) return;
    try {
      const res = await fetch('https://your-backend-url/api/cards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ listId, content })
      });
      const newCard = await res.json();
      setData(prev => ({
        ...prev,
        cards: { ...prev.cards, [newCard.id]: newCard },
        lists: {
          ...prev.lists,
          [listId]: { ...prev.lists[listId], cards: [...prev.lists[listId].cards, newCard.id] }
        }
      }));
    } catch (err) { console.error('Failed to add card', err); }
  };

  const addList = async () => {
    if (!newListTitle.trim()) return;
    try {
      const res = await fetch('https://your-backend-url/api/lists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newListTitle })
      });
      const newList = await res.json();
      setData(prev => ({
        ...prev,
        lists: { ...prev.lists, [newList.id]: newList },
        listOrder: [...prev.listOrder, newList.id]
      }));
      setNewListTitle('');
    } catch (err) { console.error('Failed to add list', err); }
  };

  const updateListTitle = async (listId, title) => {
    try {
      const res = await fetch(`https://your-backend-url/api/lists/${listId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
      });
      const updated = await res.json();
      setData(prev => ({
        ...prev,
        lists: { ...prev.lists, [listId]: updated }
      }));
    } catch (err) { console.error('Failed to update list title', err); }
  };

  const updateCardContent = async (cardId, content) => {
    try {
      const res = await fetch(`https://your-backend-url/api/cards/${cardId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content })
      });
      const updated = await res.json();
      setData(prev => ({
        ...prev,
        cards: { ...prev.cards, [cardId]: updated }
      }));
    } catch (err) { console.error('Failed to update card content', err); }
  };

  const deleteCard = async (cardId) => {
    try {
      await fetch(`https://your-backend-url/api/cards/${cardId}`, { method: 'DELETE' });
      setData(prev => {
        const newCards = { ...prev.cards }; delete newCards[cardId];
        const newLists = { ...prev.lists };
        Object.keys(newLists).forEach(listId => {
          newLists[listId].cards = newLists[listId].cards.filter(id => id !== cardId);
        });
        return { ...prev, cards: newCards, lists: newLists };
      });
    } catch (err) { console.error('Failed to delete card', err); }
  };

  const deleteList = async (listId) => {
    try {
      await fetch(`https://your-backend-url/api/lists/${listId}`, { method: 'DELETE' });
      setData(prev => {
        const newLists = { ...prev.lists }; delete newLists[listId];
        const newListOrder = prev.listOrder.filter(id => id !== listId);
        return { ...prev, lists: newLists, listOrder: newListOrder };
      });
    } catch (err) { console.error('Failed to delete list', err); }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="board" type="list" direction="horizontal">
        {(provided) => (
          <div className="board" {...provided.droppableProps} ref={provided.innerRef}>
            {data.listOrder.map((listId, index) => {
              const list = data.lists[listId];
              const cards = list.cards.map(id => data.cards[id]);
              return (
                <Draggable key={list.id} draggableId={list.id} index={index}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <List
                        list={list}
                        cards={cards}
                        addCard={addCard}
                        updateListTitle={updateListTitle}
                        updateCardContent={updateCardContent}
                        deleteCard={deleteCard}
                        deleteList={deleteList}
                      />
                    </div>
                  )}
                </Draggable>
              );
            })}

            <div className="list add-new-list">
              <input
                value={newListTitle}
                onChange={(e) => setNewListTitle(e.target.value)}
                placeholder="New list title"
              />
              <button onClick={addList}>Add List</button>
            </div>

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Board;
