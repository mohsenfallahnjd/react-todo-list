import React from 'react';
import { Link } from 'react-router-dom';

interface BoardCardProps {
    data: {[k:string]: any};
    removeBoard: (id: string) => void;
}

// eslint-disable-next-line require-jsdoc
export const BoardCard: React.FC<BoardCardProps> = ({ data, removeBoard }) => (
    <div className="c-board-card-wrapper">
        <button
            aria-label="Close"
            className="c-board-card__remove"
            onClick={ () => removeBoard(data.id) }
        >
            &times;
        </button>

        <Link to={ `/${data.id}` }>
            <div className="c-board-card">
                <p>
                    { data.title }
                </p>
            </div>
        </Link>
    </div>
);
