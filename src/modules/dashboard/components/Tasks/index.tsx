import React, { useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import { v4 as uuid } from 'uuid';
import { Item } from '../Item';

interface Card {
    id: string;
    text: string;
}

interface TasksProps {
    id: string;
    title: string;
    availableCards: Card[];
    updateBoard: (id: string, title:string, cards: Card[]) => void;
    removeTasksList: (id: string) => void;
}

// eslint-disable-next-line require-jsdoc
export const Tasks: React.FC<TasksProps> = ({
    id, title, availableCards, updateBoard, removeTasksList,
}) => {
    const [showForm, setShowForm] = useState(false);
    const [text, setText] = useState<string>('');
    const [cards, setCards] = useState<Card[]>(availableCards || []);

    /**
     * Handle submit task
     * 
     * @param {object} e - textarea event
     */
    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        if (text && text.trim().length) {
            const card = {
                id: uuid(),
                text,
            };
            setCards([...cards, card]);
            setText('');
            updateBoard(id, title, [...cards, card]);
        }
    };

    /**
     * Handle remove item
     *
     * @param {string} itemId - item id
     */
    const removeItem = (itemId: string) => {
        setCards((state) => {
            const filteredList = state.filter((item: Card) => item.id !== itemId);
            updateBoard(id, title, filteredList);
            return filteredList;
        });
    };

    /**
     * Handle edit item
     *
     * @param {string} itemId - item id
     * @param {string} itemText - text
     */
    const editItem = (itemId: string, itemText: string) => {
        setCards((state) => {
            const filteredList = state.map((item: Card) => (
                item.id === itemId
                    ? {
                        ...item,
                        text: itemText,
                    } : item
            ));
            updateBoard(id, title, filteredList);
            return filteredList;
        });
    };

    return (
        <div className="c-tasks">
            <h2 className="c-tasks__title">
                { title }
                <button
                    className="c-task-item__remove"
                    onClick={ () => removeTasksList(id) }
                >
                    &times;
                </button>
            </h2>
            <article id="list" className="c-tasks__list">
                <ReactSortable
                    group="shared"
                    animation={ 200 }
                    delay={ 1 }
                    swap
                    multiDrag
                    setList={ setCards }
                    list={ cards }
                    onUpdate={ updateBoard(id, title, cards) }
                >
                    {cards.map((card: Card) => (
                        <Item
                            key={ card.id }
                            id={ card.id }
                            title={ card.text }
                            editItem={ editItem }
                            removeItem={ removeItem }
                        />
                    ))}
                </ReactSortable>
            </article>
            {!showForm && (
                <button
                    className="c-tasks__add-new"
                    type="button"
                    onClick={ () => setShowForm(true) }
                >
                    + Add another card
                </button>
            )}
            {showForm && (
                <form
                    onSubmit={ handleSubmit }
                    className="c-tasks__new-task"
                >
                    <textarea
                        className="c-tasks__new-task__input"
                        name="card-task"
                        id="card-text"
                        value={ text }
                        onChange={ (e) => setText(e.target.value) }
                        onKeyUp={ (event) => {
                            if (event.key === 'Enter') {
                                handleSubmit(event);
                            }
                        } }
                    />
                    <div className="c-tasks__new-task__button-wrapper">
                        <button
                            className="c-tasks__new-task__cancel"
                            type="submit"
                            onClick={ () => setShowForm(false) }
                        >
                            &times;
                        </button>
                        <button
                            className="c-tasks__new-task__add-button"
                            type="submit"
                        >
                            Add Task
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};
