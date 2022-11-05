/* eslint-disable require-jsdoc */

import React, { useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import Tile from '../Item';

interface IBoardProps {
    title: string;
}
interface ICard {
    id: number;
    text: string;
}

export const Board: React.FC<IBoardProps> = ({ title }) => {
    const [showForm, setShowForm] = useState(false);
    const [text, setText] = useState<string>('');
    const [cards, setCards] = useState<ICard[]>([]);
    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        const card = {
            id: cards.length + 1,
            text,
        };
        setCards([...cards, card]);
        setText('');
    };

    return (
        <div
            className="bg-gray-200 w-11/12 sm:w-10/12
            md:w-80 h-full pb-3 rounded md:mr-6 mb-6"
        >
            <h2 className="px-4 py-2 text-center
            text-black text-lg font-bold"
            >
                {title}
            </h2>
            <article id="list" className="mx-2">
                <ReactSortable
                    group="shared"
                    animation={ 200 }
                    delay={ 1 }
                    swap
                    multiDrag
                    setList={ setCards }
                    list={ cards }
                >
                    {cards.map((card: ICard) => (
                        <Tile key={ card.id }>{card.text}</Tile>
                    ))}
                </ReactSortable>
            </article>
            {!showForm && (
                <button
                    style={{ outline: 'none', border: 'none' }}
                    className="text-sm ml-2 mt-1 text-blue-500 hover:bg-blue-200 transition-all px-3 py-1"
                    type="button"
                    onClick={ () => setShowForm(true) }
                >
                    + Add another card
                </button>
            )}
            {showForm && (
                <form
                    onSubmit={ handleSubmit }
                    className="w-full px-2 my-2"
                >
                    <textarea
                        style={{ border: 'none', outline: 'none' }}
                        className="overflow-y-hidden block w-full
                    resize-none py-2 px-2 text-sm rounded-sm"
                        name="card-task"
                        id="card-text"
                        value={ text }
                        onChange={ (e) => setText(e.target.value) }
                    />
                    <div className="flex items-center ml-1 mt-3">
                        <button
                            style={{
                                outline: 'none',
                                border : 'none',
                            }}
                            className="block text-sm mr-5 rounded-md
                        text-white bg-blue-500 hover:bg-blue-400
                        transition-all px-3 py-2"
                            type="submit"
                        >
                            Add Card
                        </button>
                        <button
                            style={{
                                outline: 'none',
                                border : 'none',
                            }}
                            className="block text-4xl text-blue-500"
                            type="submit"
                            onClick={ () => setShowForm(false) }
                        >
                            &times;
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};
