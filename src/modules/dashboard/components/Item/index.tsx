/* eslint-disable require-jsdoc */
import React from 'react';

interface ITileProps{
    children: React.ReactNode;
}

const Tile:React.FC<ITileProps> = ({ children }) => (
    <div className="bg-white py-2 px-2 mb-2
            transition-shadow shadow-lg rounded"
    >
        <p className="text-sm">{children}</p>
    </div>
);

export default Tile;
