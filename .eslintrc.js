module.exports = {
    rules: {
        '@typescript-eslint/no-empty-interface': 'off', // if you want to disable
        "@typescript-eslint/no-empty-object-type": "off",
        "@typescript-eslint/no-unused-vars": "off",
        '@typescript-eslint/no-unused-vars': ['error', {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
        }]
    }
}