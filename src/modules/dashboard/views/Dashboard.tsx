import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { v4 as uuid } from 'uuid';
import { Tasks } from '../components/Tasks';
import '../scss/dashboard.scss';

interface Card {
    id: string;
    text: string;
}
interface TasksInterface {
    id: string;
    title: string;
    cards: Card[];
}

/**
 * Dashboard jsx
 */
export const Dashboard: React.FC = () => {
    const { t } = useTranslation();
    const { id: boardId } = useParams();
    const boards = JSON.parse(localStorage.getItem('todo-list') || '[]');
    const boardIndex = boards?.findIndex((b: {[k: string]: any}) => b.id === boardId);
    const [tasksList, setTasksList] = useState<TasksInterface[]>(boards[boardIndex].items || []);
    const [showForm, setShowForm] = useState(false);
    const [text, setText] = useState<string>('');

    /**
     * Update board
     * 
     * @param {string} id - list id
     * @param {string} title - list title
     * @param {Array} cards - tasks list
     */
    const updateBoard = (id: string, title: string, cards: {[k: string]: any}[]) => {
        if (boards[boardIndex].items && boards[boardIndex].items.length) {
            let find = false;
            boards[boardIndex] = {
                ...boards[boardIndex],
                items: boards[boardIndex].items.map((item: {[k: string]: any}) => {
                    if (item.id === id) {
                        find = true;
                        return {
                            ...item,
                            cards,
                        };
                    }

                    return item;
                }),
            };

            if (!find) {
                boards[boardIndex].items.push({
                    id,
                    title,
                    cards,
                });
            }
        } else {
            boards[boardIndex].items.push({
                id,
                title,
                cards,
            });
        }

        localStorage.setItem('todo-list', JSON.stringify(boards));
    };

    /**
     * Handle submit list
     * 
     * @param {object} e - textarea event
     */
    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        if (text && text.trim().length) {
            const newList: TasksInterface = { id: uuid(), title: text, cards: [] };
            setTasksList([...tasksList, newList]);
            setText('');
            updateBoard(newList.id, newList.title, newList.cards);
        }
    };

    /**
     * Handle remove item
     *
     * @param {string} itemId - item id
     */
    const removeTasksList = (itemId: string) => {
        setTasksList((state) => {
            const filteredList = state.filter((item: {[k:string]: any}) => item.id !== itemId);
            boards[boardIndex].items = filteredList;
            localStorage.setItem('todo-list', JSON.stringify(boards));
            return filteredList;
        });
    };

    return (
        <div className="m-dashboard">
            <Helmet>
                <title>{ t('dashboard:title') }</title>
                <link rel="canonical" href={ window.location.href } />
            </Helmet>

            <div className="m-dashboard__board-content">
                <h1 className="m-dashboard__board-title">
                    <Link to="/">
                        back to home |
                    </Link>
                    
                    ToDo List -
                    {' '}
                    { boards[boardIndex].title}
                </h1>
                <div className="m-dashboard__board-list">

                    {tasksList.map((tasksCard: {[k: string]: any}) => (
                        <Tasks
                            key={ tasksCard.id }
                            title={ tasksCard.title }
                            id={ tasksCard.id }
                            availableCards={ tasksCard.cards }
                            updateBoard={ updateBoard }
                            removeTasksList={ removeTasksList }
                        />
                    ))}

                    <div className="c-tasks c-tasks--add-list">
                        {!showForm && (
                            <button
                                className="c-tasks__add-new"
                                type="button"
                                onClick={ () => setShowForm(true) }
                            >
                                + Add another list
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
                                        Add list
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
