import React from 'react';

interface BoardCardProps {
    data: {[k:string]: any};
}

// eslint-disable-next-line require-jsdoc
export const BoardCard: React.FC<BoardCardProps> = ({ data }) => (
    <div className="c-board-card-wrapper">
        <div className="c-board-card">
            { data.title }
        </div>
    </div>
);
