import React from 'react';

interface AddNewCardProps {
    creatingStatus: boolean;
    stopAddingNewBoard: () => void;
    addNewBoard: () => void;
    // eslint-disable-next-line no-unused-vars
    handleInputChange: (e: {[key: string]: any}) => void;
    // eslint-disable-next-line no-unused-vars
    changeCreatingStatus: (e: boolean) => void;
}

// eslint-disable-next-line require-jsdoc
export const AddNewCard: React.FC<AddNewCardProps> = ({
    addNewBoard, stopAddingNewBoard, handleInputChange, creatingStatus, changeCreatingStatus,
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
                                    onClick={ stopAddingNewBoard }
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


