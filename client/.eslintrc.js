module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/stylistic',
        'plugin:@typescript-eslint/recommended-type-checked'
    ],
    rules: {
        '@typescript-eslint/no-var-requires': 0,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.eslint.json',
        tsconfigRootDir: dirname,
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint'],
    root: true,
};