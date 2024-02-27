import { rimraf, rimrafSync, native, nativeSync } from 'rimraf';

console.log('Start deleting');
const p = [];
p.push(rimraf('**/node_modules/**', { glob: true }));
p.push(rimraf('**/.turbo/**', { glob: true }));
p.push(rimraf('**/dist/**', { glob: true }));
p.push(rimraf('**/tsconfig.tsbuildinfo', { glob: true }));
Promise.all(p)
	.then(() => {
		console.log('Done');
	})
	.catch((e) => {
		console.log(e);
	});
console.log('Waiting....');
