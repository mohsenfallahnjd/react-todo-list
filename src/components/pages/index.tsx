import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Home } from '../../modules/home/views/Home';
import { Dashboard } from '../../modules/dashboard/views/Dashboard';
import { HelmetMetaTags } from '../HelmetMetaTags';

// eslint-disable-next-line require-jsdoc
export const Index: React.FunctionComponent = () => (
    <HelmetProvider>

        {/* Meta tags */}
        <HelmetMetaTags />

        {/* Main Content */}
        <main>
            <Routes>
                <Route path="/" element={ <Home /> } />
                <Route path="/:id" element={ <Dashboard /> } />
            </Routes>
        </main>
    </HelmetProvider>
);
