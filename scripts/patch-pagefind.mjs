import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const workerPath = 'dist/pagefind/pagefind-worker.js';
if (!existsSync(workerPath)) {
	process.exit(0);
}

let content = readFileSync(workerPath, 'utf8');
const target = 'queued.resolve(await fetch(queued.input));';
const replacement =
	'let u=queued.input;if(typeof u==="string"&&u.startsWith("/")&&self.location?.origin&&self.location.origin!=="null"){u=self.location.origin+u;}queued.resolve(await fetch(u));';

if (content.includes(target)) {
	content = content.replace(target, replacement);
	writeFileSync(workerPath, content, 'utf8');
	console.log('✓ Patched pagefind-worker.js for blob/headless origin resolution');
}
