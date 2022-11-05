/*-----------------------------------------------------------------
- Load locales and register it
-----------------------------------------------------------------*/
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { deepmerge } from 'deepmerge-ts';
import config from './config';

const { locales } = config;

/**
 * Make locales empty object
 *
 * @returns {object}
 */
const makeLocalesObj = (): object => {
    const obj: {[key: string]: any} = {};
    locales.map((locale) => { // eslint-disable-line
        obj[locale] = {};
    });
    return obj;
};
let messages: any = makeLocalesObj();
type files = {
    root: any | undefined,
    modules: any | undefined,
};
const importedFiles: files | any = {
    root   : null,
    modules: null,
};

// Load files
importedFiles.root = require.context('@/locales', true, /\.(js|ts|json)$/);
importedFiles.modules = require.context('@modules', true, /\/locales[\S]*\.(js|ts|json)$/);

/**
 * Get nth occurrence of string
 *
 * @param {string} string
 * @param {string} subString
 * @param {*} index
 * @returns {number}
 */
const getPosition = (string: string, subString: string, index: any): number => string.split(subString, index).join(subString).length;

// Merge messages
Object.keys(importedFiles).forEach((section) => {
    const importedMessages : any = makeLocalesObj();
    importedFiles[section].keys().forEach((fileName: string) => {
        let locale :any = null;
        let file :any = null;
        const content = importedFiles[section](fileName).default;
    
        if (section.includes('modules')) {
            locale = fileName.substring(getPosition(fileName, '/', 3) + 1, getPosition(fileName, '/', 3) + 3);
            file = fileName.split('/').pop()?.replace('.js', '').replace('.ts', '');
            if (locales.includes(locale)) {
                importedMessages[locale][file] = deepmerge(importedMessages[locale][file] || {}, content);
            }
        } else {
            locale = fileName.substring(2, 4);
            file = fileName.substring(5).replace('.js', '').replace('.ts', '');

            if (locales.includes(locale)) {
                importedMessages[locale][file] = deepmerge(importedMessages[locale][file] || {}, content);
            }
        }
    });
    messages = deepmerge(importedMessages, messages);
});

// Defaults
const fallbackLng = locales[0] || 'en';

// Register messages
i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: messages,
        fallbackLng,
        debug    : false,

        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
    });

export default i18n;
