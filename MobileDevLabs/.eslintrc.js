module.exports = {
    root: true,
    extends: [
        '@react-native-community',
        'airbnb-typescript',
        'prettier',
        'prettier/@typescript-eslint',
        'prettier/react'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        createDefaultProgram: true,
        sourceType: 'module',
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json']
    },
    rules: {
        '@typescript-eslint/no-use-before-define': [
            'warn',
            { variables: false }
        ],
        'react/destructuring-assignment': 'warn',
        'react/jsx-props-no-spreading': 'warn',
        'global-require': 'warn',
        'react/prop-types': 'warn'
    }
};
