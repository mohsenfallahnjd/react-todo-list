import React, { useState } from 'react';

interface ItemProps{
    id: string;
    title: string;
    removeItem: (id: string) => void;
    editItem: (id: string, title: string) => void;
}

/**
 * Task item
 */
export const Item:React.FC<ItemProps> = ({
    id, title, removeItem, editItem,
}) => {
    const [showForm, setShowForm] = useState(false);
    const [text, setText] = useState<string>(title || '');

    return (
        <div className="c-task-item">
            {!showForm && (
                <>
                    <p className="c-task-item__title">
                        { title }
                    </p>
                    <button
                        className="c-task-item__edit"
                        title="edit"
                        onClick={ () => setShowForm(true) }
                    >
                        🖊️
                    </button>
                    <button
                        className="c-task-item__remove"
                        title="remove"
                        onClick={ () => removeItem(id) }
                    >
                        &times;
                    </button>
                </>
            )}
            {showForm && (
                <form
                    onSubmit={ () => {
                        editItem(id, text);
                        setText(text);
                        setShowForm(false);
                    } }
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
                                editItem(id, text);
                                setText(text);
                                setShowForm(false);
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
                            Save
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};
