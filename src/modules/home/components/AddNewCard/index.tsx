import React from 'react';

interface AddNewCardProps {
    creatingStatus: boolean;
    addNewBoard: () => void;
    resetNewBoard: () => void;
    changeCreatingStatus: (e: boolean) => void;
    handleInputChange: (e: {[key: string]: any}) => void;
}

// eslint-disable-next-line require-jsdoc
export const AddNewCard: React.FC<AddNewCardProps> = ({
    creatingStatus,
    addNewBoard,
    resetNewBoard,
    changeCreatingStatus,
    handleInputChange,
}) => (
    <div className="c-board-card-wrapper">
        <div className="c-board-card c-board-card--new">
            {
                creatingStatus
                    ? (
                        <>
                            <div>
                                <span>Title: </span>
                                <input
                                    type="text"
                                    onChange={ handleInputChange }
                                    onKeyUp={ (event) => {
                                        if (event.key === 'Enter') {
                                            addNewBoard();
                                        }
                                    } }
                                />
                            </div>
                            <div>
                                <button
                                    className="c-board-card__button c-board-card__button--add"
                                    onClick={ resetNewBoard }
                                >
                                    Cancel
                                </button>
                                <button
                                    className="c-board-card__button c-board-card__button--add"
                                    onClick={ addNewBoard }
                                >
                                    Ok
                                </button>
                            </div>
                        </>
                    ) : (
                        <button
                            className="c-board-card__button c-board-card__button--create"
                            onClick={ () => changeCreatingStatus(true) }
                        >
                            Add new board
                        </button>
                    )
            }
        </div>
    </div>
);


