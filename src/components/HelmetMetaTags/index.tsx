import React from 'react';
import { Helmet } from 'react-helmet-async';
import Config from '../../controller/manifest';

interface HelmetMetaTagsProps {}

// eslint-disable-next-line require-jsdoc
export const HelmetMetaTags: React.FC<HelmetMetaTagsProps> = () => (
    <Helmet
        titleTemplate={ `${Config.name}- %s` }
        defaultTitle="Mohsen Fallahnejad"
        defer={ false }
    >
        {/* html attributes */}
        <html lang={ Config.lang } />

        {/* base element */}
        <base target="_blank" href={ window.location.href } />

        {/* multiple meta elements */}
        <meta name="description" content={ Config.description } />
        <meta property="og:type" content="article" />

        {/* multiple link elements */}
        <link rel="canonical" href={ window.location.href } />
        <link rel="apple-touch-icon" href="logo192.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="logo512.png" />
    </Helmet>
);
