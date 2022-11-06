import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { MainLayout } from './components/layouts/MainLayout';
import { Index } from './components/pages';
import store from './redux';

import '@controller/i18next';
import '@assets/scss/style.scss';

// eslint-disable-next-line
export default function App() {
    return (
        <Provider store={ store }>
            <BrowserRouter>
                <MainLayout Content={ Index } />
            </BrowserRouter>
        </Provider>
    );
}
