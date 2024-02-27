// /* eslint-env node */
module.exports = {
	env: {
		node: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
	],
	plugins: ['@typescript-eslint', 'prettier'],
	parser: '@typescript-eslint/parser',
	ignorePatterns: ['.eslintrc.cjs'],
	rules: {
		'prettier/prettier': 'error',
		'@typescript-eslint/no-unused-vars': [
			'error',
			{
				argsIgnorePattern: '^_',
				varsIgnorePattern: '^_',
				caughtErrorsIgnorePattern: '^%%%%',
			},
		],
	},
};
