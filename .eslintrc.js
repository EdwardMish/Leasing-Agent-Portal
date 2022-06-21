module.exports = {
    env: {
        browser: true,
        es2021: true,
        'jest/globals': true,
    },
    globals: {
        ROOT: 'readonly',
        API_ROOT: 'readonly',
        WORKER_ROOT: 'readonly',
        LOGIN_URL: 'readonly',
    },
    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'airbnb',
        'plugin:import/typescript',
        'prettier',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: ['react', '@typescript-eslint', 'jest', 'prettier'],
    rules: {
        'prettier/prettier': 'error',
        'linebreak-style': [2, 'windows'],
        'import/extensions': [2, 'never'],
        'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
        'react/prop-types': [0],
        'no-use-before-define': 0,
        '@typescript-eslint/no-use-before-define': [2],
        'react/jsx-indent': [1, 4],
        'react/jsx-indent-props': [1, 4],
        'import/no-cycle': [
            1,
            {
                maxDepth: 10,
                ignoreExternal: true,
            },
        ],
        // Props spreading - Needs addressed
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-props-no-spreading.md
        'react/jsx-props-no-spreading': [1],
        'max-len': [1, { code: 125 }],
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true }],
        // https://github.com/typescript-eslint/typescript-eslint/issues/2483
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': 'error',
        'no-undef': 'off', // https://github.com/typescript-eslint/typescript-eslint/issues/342
        'no-nested-ternary': 'off',
        'react/require-default-props': 'off',
        'import/no-unresolved': 'off', // TODO: remove this rules off and use settings/import resolver/webpack with the webpack.local.js config
        'import/no-absolute-path': 'off',
    },
};

