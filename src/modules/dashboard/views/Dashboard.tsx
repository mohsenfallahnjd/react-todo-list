import React from 'react';
import { Helmet } from 'react-helmet-async';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import '../scss/home.scss';
import { useTranslation } from 'react-i18next';
import { MarkdownEditor } from '../components/Markdown';

/**
 * Home jsx
 */
export const Home: React.FC = () => {
    const { t } = useTranslation();
    const [markdown, setMarkdown] = React.useState(t('home:default').toString());

    /**
     * Handle input fields
     * 
     * @param {string} e - textarea input
     */
    const onChangeInput: Function = (e: string) => setMarkdown(e);

    return (
        <div className="m-home">
            <Helmet>
                <title>{ t('home:title') }</title>
                <link rel="canonical" href={ window.location.href } />
            </Helmet>

            <MarkdownEditor onChangeInput={ onChangeInput } />

            <h4>{ t('home:output') }</h4>
            <div className="m-home__react-markdown-wrapper">
                {/* eslint-disable-next-line react/no-children-prop */}
                <ReactMarkdown children={ markdown } remarkPlugins={ [remarkGfm] } />
            </div>

            <footer className="main-footer">
                <a
                    href="https://theMohsen.me"
                    target="_blank"
                    rel="noreferrer"
                    className="text"
                >
                    { t('general:copyright', { year: 2022 }) }

                </a>
                <div className="text">{ t('general:powered_by') }</div>
            </footer>
        </div>
    );
};
