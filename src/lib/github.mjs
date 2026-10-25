// What the docs show about the bayesian-ssh repository, read from GitHub once per build:
// the latest release (for install commands) and the star count (in the header). The site
// rebuilds daily, so both stay current. Without network, the build falls back to the last
// known release and shows no count.

const REPO = 'abdoufermat5/bayesian-ssh';
/** Used only when GitHub can't be reached. */
const LAST_KNOWN_VERSION = '2.13.2';

async function get(path) {
	const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'bssh-docs' };
	if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
	const res = await fetch(`https://api.github.com/${path}`, {
		headers,
		signal: AbortSignal.timeout(8000),
	});
	if (!res.ok) throw new Error(`GitHub ${path}: ${res.status}`);
	return res.json();
}

const [repo, release] = await Promise.allSettled([
	get(`repos/${REPO}`),
	get(`repos/${REPO}/releases/latest`),
]);

export const repoUrl = `https://github.com/${REPO}`;
/** Latest release without the leading `v`, e.g. `2.13.2`. */
export const latestVersion =
	release.status === 'fulfilled' ? release.value.tag_name.replace(/^v/, '') : LAST_KNOWN_VERSION;
/** Stars on GitHub, or `null` when unknown. */
export const stars = repo.status === 'fulfilled' ? repo.value.stargazers_count : null;

if (release.status === 'rejected' || repo.status === 'rejected') {
	console.warn(`[github] using fallbacks: ${[release, repo].find((r) => r.status === 'rejected').reason}`);
}
