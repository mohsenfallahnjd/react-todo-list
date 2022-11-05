/* eslint-disable require-jsdoc */
import React from 'react';
import { Helmet } from 'react-helmet-async';
import '../scss/dashboard.scss';
import { useTranslation } from 'react-i18next';

import { Board } from '../components/Container';


/**
 * Dashboard jsx
 */
export const Dashboard: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="m-dashboard">
            <Helmet>
                <title>{ t('dashboard:title') }</title>
                <link rel="canonical" href={ window.location.href } />
            </Helmet>
            <div
                style={{ background: '#0079bf', maxWidth: '1440px' }}
                className="w-screen relative pt-4 max-h-full h-screen"
            >
                <div className="w-11/12 mx-auto relative z-50">
                    <h1 className="text-2xl md:text-4xl text-blue-300 mb-6 font-bold text-center ">
                        Trello Clone
                    </h1>
                    <div className="flex lg:justify-between justify-center flex-wrap lg:flex-nowrap">
                        <Board title="Backlog" />
                        <Board title="TO DOs" />
                        <Board title="DOING" />
                        <Board title="DONE" />
                    </div>
                </div>
            </div>
        </div>
    );
};
