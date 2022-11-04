import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface MarkdownEditorProps {
  onChangeInput: Function
}

// eslint-disable-next-line require-jsdoc
export const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ onChangeInput }) => {
    const { t } = useTranslation('home');
    // eslint-disable-next-line no-unused-vars
    const [input, setInput] = useState(t('default').toString());

    /**
     * Handle input fields
     * 
     * @param {Object} e - textarea input
     */
    const handleChange = (e: {[key: string]: any}) => onChangeInput(e.target.value);

    return (
        <div className="c-markdown-editor">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="markdown-content">
                { t('input_label') }
            </label>
            <textarea
                id="markdown-content"
                onChange={ handleChange }
                defaultValue={ input }
            />
        </div>
    );
};
