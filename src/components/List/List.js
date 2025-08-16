import React, { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import Card from '../Card/Card';
import './List.css';

function List({ list, cards, addCard, updateListTitle, updateCardContent, deleteCard, deleteList }) {
  const [newCard, setNewCard] = useState('');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [title, setTitle] = useState(list.title);

  const handleAddCard = () => {
    if (!newCard.trim()) return;
    addCard(list.id, newCard);
    setNewCard('');
  };

  const handleTitleBlur = () => {
    setIsEditingTitle(false);
    if (title.trim() && title !== list.title) {
      updateListTitle(list.id, title);
    } else {
      setTitle(list.title);
    }
  };

  return (
    <div className="list">
      <div className="list-header">
        {isEditingTitle ? (
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleTitleBlur}
            onKeyDown={(e) => e.key === 'Enter' && handleTitleBlur()}
            autoFocus
          />
        ) : (
          <h2 onClick={() => setIsEditingTitle(true)}>{list.title}</h2>
        )}
        <button className="delete-list-btn" onClick={() => deleteList(list.id)}>×</button>
      </div>

      <Droppable droppableId={list.id}>
        {(provided) => (
          <div className="card-container" {...provided.droppableProps} ref={provided.innerRef}>
            {cards.map((card, index) => (
              <Card
                key={card.id}
                card={card}
                index={index}
                updateCardContent={updateCardContent}
                deleteCard={deleteCard}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <div className="add-card">
        <input
          value={newCard}
          onChange={(e) => setNewCard(e.target.value)}
          placeholder="Add new todo"
        />
        <button onClick={handleAddCard}>Add</button>
      </div>
    </div>
  );
}

export default List;
