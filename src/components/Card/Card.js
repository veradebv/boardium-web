import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import './Card.css';

function Card({ card, index, updateCardContent, deleteCard }) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(card.content);

  const handleBlur = () => {
    setIsEditing(false);
    if (content.trim() && content !== card.content) {
      updateCardContent(card.id, content);
    } else {
      setContent(card.content);
    }
  };

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <div
          className="card"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {isEditing ? (
            <input
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onBlur={handleBlur}
              onKeyDown={(e) => e.key === 'Enter' && handleBlur()}
              autoFocus
            />
          ) : (
            <div className="card-content">
              <span onClick={() => setIsEditing(true)}>{card.content}</span>
              <button className="delete-btn" onClick={() => deleteCard(card.id)}>×</button>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
}

export default Card;
