import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import StylelintPlugin from 'vite-plugin-stylelint';
import eslintPlugin from 'vite-plugin-eslint';
import ViteRequireContext from '@originjs/vite-plugin-require-context';
import { VitePWA } from 'vite-plugin-pwa';
import { resolve } from 'path';

const manifest = require('./src/controller/manifest.ts');

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        ViteRequireContext(),
        VitePWA({
            base         : '/',
            srcDir       : 'src',
            filename     : 'sw.ts',
            includeAssets: ['/favicon.png'],
            strategies   : 'injectManifest',
            manifest,
        }),
        eslintPlugin({
            fix: true,
        }),
        StylelintPlugin({
            include: ['src/**/*.css', 'src/**/*.scss'],
            fix    : true,
        }),
    ],
    resolve: {
        alias: [
            { find: '@', replacement: resolve(__dirname, 'src') },
            { find: '@assets', replacement: resolve(__dirname, 'src/assets') },
            { find: '@controller', replacement: resolve(__dirname, 'src/controller') },
            { find: '@modules', replacement: resolve(__dirname, 'src/modules') },
            { find: '@components', replacement: resolve(__dirname, 'src/components') },
        ],
    },
});
