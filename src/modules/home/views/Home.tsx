import React from 'react';
import { Helmet } from 'react-helmet-async';
import { v4 as uuid } from 'uuid';
import { useTranslation } from 'react-i18next';
import { BoardCard } from '../components/BoardCard';
import { AddNewCard } from '../components/AddNewCard';
import '../scss/home.scss';

/**
 * Home jsx
 */
export const Home: React.FC = () => {
    const { t } = useTranslation();
    const [boards, setBoards] = React.useState<{}[]>(JSON.parse(localStorage.getItem('todo-list') || '[]'));
    const [cardTitle, setCardTitle] = React.useState<string>('');
    const [creatingStatus, setCreatingStatus] = React.useState<boolean>(false);

    /**
     * Handle input fields
     * 
     * @param {Object} e - text input
     */
    const handleInputChange = (e: {[key: string]: any}) => setCardTitle(e.target.value);

    /**
     * Handle stop adding new board
     */
    const resetNewBoard = () => {
        setCreatingStatus(false);
        setCardTitle('');
    };

    /**
     * Handle add new board
     */
    const addNewBoard = () => {
        if (cardTitle && cardTitle.length) {
            const data: {[k:string]: any} = {
                id   : uuid(),
                title: cardTitle,
                items: [
                    { id: uuid(), title: 'Backlog', cards: [] },
                    { id: uuid(), title: 'TODO', cards: [] },
                    { id: uuid(), title: 'DOING', cards: [] },
                    { id: uuid(), title: 'DONE', cards: [] },
                ],
            };
            setBoards((state) => {
                localStorage.setItem('todo-list', JSON.stringify(state.concat(data)));
                return state.concat(data);
            });
            resetNewBoard();
        }
    };

    /**
     * Handle remove board
     *
     * @param {string} id - Board id
     */
    const removeBoard = (id: string) => {
        setBoards((state) => {
            const filteredList = state.filter((board: {[k:string]: any}) => board.id !== id);
            localStorage.setItem('todo-list', JSON.stringify(filteredList));
            return filteredList;
        });
    };

    return (
        <div className="m-home">
            <Helmet>
                <title>{ t('home:title') }</title>
                <link rel="canonical" href={ window.location.href } />
            </Helmet>

            <div className="m-home__board-wrapper">
                {
                    boards.map(
                        (item: {[k:string]: any}) => (
                            <BoardCard
                                data={ item }
                                key={ item.id }
                                removeBoard={ removeBoard }
                            />
                        ),
                    )
                }

                <AddNewCard
                    creatingStatus={ creatingStatus }
                    changeCreatingStatus={ setCreatingStatus }
                    handleInputChange={ handleInputChange }
                    addNewBoard={ addNewBoard }
                    resetNewBoard={ resetNewBoard }
                />
            </div>

        </div>
    );
};
