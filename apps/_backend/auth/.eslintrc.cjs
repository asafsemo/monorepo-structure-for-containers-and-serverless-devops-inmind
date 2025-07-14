require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
	extends: ['../devConfig/.eslintrc.cjs'],
	root: true,
	parserOptions: {
		tsconfigRootDir: __dirname,
		project: ['./tsconfig.json'],
		sourceType: 'module',
	},
};
