import React from 'react';

interface MainLayoutProps {
  Content: React.FunctionComponent
}

// eslint-disable-next-line require-jsdoc
export const MainLayout: React.FC<MainLayoutProps> = ({ Content }) => (
    <div className="container">
        <Content />
    </div>
);
