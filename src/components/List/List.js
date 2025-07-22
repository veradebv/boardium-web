import React from "react";
import { Droppable } from "react-beautiful-dnd";
import Card from '../Card/Card';
import './List.css';

function List({ list, cards }) {
    return (
        <div className="list">
            <h2>{list.title}</h2>
            <Droppable droppableId={list.id}>
                {(provided) => (
                    <div
                        className="card-container"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {cards.map((card, index) => (
                            <Card key={card.id} card={card} index={index} />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    )
}

export default List;
