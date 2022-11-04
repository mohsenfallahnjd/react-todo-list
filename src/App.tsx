import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { MainLayout } from './components/layouts/MainLayout';
import { Index } from './components/pages';

import '@controller/i18next';
import '@assets/scss/style.scss';

// eslint-disable-next-line
export default function App() {
    return (
        <BrowserRouter>
            <MainLayout Content={ Index } />
        </BrowserRouter>
    );
}
