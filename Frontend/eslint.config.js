// 🔧 Importiere ESLint-Basiskonfiguration und Plugins
import js from '@eslint/js'                      // ESLint-Empfehlungen für Vanilla JavaScript
import globals from 'globals'                   // Browser-spezifische globale Variablen (zb `window`)
import reactHooks from 'eslint-plugin-react-hooks'  // Plugin für Regeln rund um React Hooks
import reactRefresh from 'eslint-plugin-react-refresh' // Plugin für Vite + React Fast Refresh

export default [
    // 🚫 Ignoriere den Build-Ordner
    { ignores: ['dist'] },

    // 🧠 Konfiguration für alle JS/JSX-Dateien im Projekt
    {
        files: ['**/*.{js,jsx}'], // Gilt für alle JS/JSX-Dateien
        languageOptions: {
            ecmaVersion: 2020, // Unterstützt moderne JavaScript-Syntax
            globals: globals.browser, // Erlaubt Nutzung von browser-typischen Variablen
            parserOptions: {
                ecmaVersion: 'latest', // Nutzt die neueste JS-Version
                ecmaFeatures: { jsx: true }, // JSX wird erlaubt
                sourceType: 'module', // Import/Export Syntax erlaubt
            },
        },

        // 🧩 Aktivierte ESLint-Plugins
        plugins: {
            'react-hooks': reactHooks, // Prüft Regeln für Hooks (zb useEffect-Abhängigkeiten)
            'react-refresh': reactRefresh, // Unterstützt Fast Refresh in React (zb mit Vite)
        },

        // 📏 Aktivierte Regeln
        rules: {
            ...js.configs.recommended.rules,           // Standard ESLint-Regeln
            ...reactHooks.configs.recommended.rules,   // Empfehlungen für React-Hooks

            // 🔥 Warnung bei ungenutzten Variablen – außer Konstanten mit Großbuchstaben (zb `API_URL`)
            'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],

            // ⚠️ Warnung, wenn Komponenten nicht korrekt für HMR exportiert sind
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],
        },
    },
]