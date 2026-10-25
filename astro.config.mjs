// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightLinksValidator from 'starlight-links-validator';

// Public URL of the deployed site, e.g. https://docs.example.com (used for canonical URLs and the sitemap).
// `||`, not `??`: CI passes an empty string when the repository variable is unset.
const site = process.env.DOCS_SITE || 'http://localhost:4321';

const group = (label, translations, items) => ({ label, translations, items });

export default defineConfig({
	site,
	devToolbar: { enabled: false },
	integrations: [
		starlight({
			title: 'Bayesian SSH',
			description: 'Documentation for Bayesian SSH, the keyboard-first SSH manager, and bssh Teams.',
			logo: { src: './src/assets/logo.svg' },
			favicon: '/favicon.svg',
			defaultLocale: 'root',
			locales: {
				root: { label: 'English', lang: 'en' },
				fr: { label: 'Français', lang: 'fr' },
				es: { label: 'Español', lang: 'es' },
				'zh-cn': { label: '简体中文', lang: 'zh-CN' },
			},
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/abdoufermat5/bayesian-ssh' },
			],
			editLink: { baseUrl: 'https://github.com/abdoufermat5/bssh-docs/edit/main/' },
			lastUpdated: true,
			expressiveCode: {
				defaultProps: { frame: 'none' },
				styleOverrides: {
					borderRadius: '8px',
					borderColor: 'var(--sl-color-hairline-light)',
					codeFontSize: '0.8125rem',
					frames: { shadowColor: 'transparent' },
				},
			},
			customCss: [
				'@fontsource-variable/inter',
				'@fontsource-variable/jetbrains-mono',
				'./src/styles/custom.css',
			],
			components: {
				Footer: './src/components/Footer.astro',
				SocialIcons: './src/components/SocialIcons.astro',
			},
			plugins: [starlightLinksValidator({ errorOnInconsistentLocale: true })],
			sidebar: [
				group('Start here', { fr: 'Premiers pas', es: 'Primeros pasos', 'zh-CN': '入门' }, [
					'start/introduction',
					'start/installation',
					'start/quick-start',
					'start/configuration',
				]),
				group('bssh AI', { fr: 'bssh AI', es: 'bssh AI', 'zh-CN': 'bssh AI' }, [
					'ai/overview',
					'ai/quick-start',
					'ai/policies',
					'ai/approvals',
					'ai/host-setup',
					'ai/teams-agents',
				]),
				group('Security', { fr: 'Sécurité', es: 'Seguridad', 'zh-CN': '安全' }, [
					'reference/security',
					'ai/security',
					'teams/security',
				]),
				group('Guides', { fr: 'Guides', es: 'Guías', 'zh-CN': '指南' }, [
					'guides/connections',
					'guides/search-and-ranking',
					'guides/aliases',
					'guides/environments',
					'guides/bastions',
					'guides/authentication',
					'guides/tunnels',
					'guides/remote-commands',
					'guides/sessions',
					'guides/recording',
					'guides/import-export',
					'guides/inventory-sources',
					'guides/desktop',
				]),
				group('Teams', { fr: 'Teams', es: 'Teams', 'zh-CN': 'Teams 团队版' }, [
					'teams/overview',
					'teams/setup',
					'teams/members',
					'teams/organizations',
					'teams/sync',
					'teams/audit-log',
					'teams/plans-and-billing',
					'teams/self-hosting',
				]),
				group('Reference', { fr: 'Référence', es: 'Referencia', 'zh-CN': '参考' }, [
					'reference/cli',
					'reference/configuration',
					'reference/troubleshooting',
					{
						label: 'Changelog',
						translations: { fr: 'Journal des modifications', es: 'Registro de cambios', 'zh-CN': '更新日志' },
						link: 'https://github.com/abdoufermat5/bayesian-ssh/blob/main/CHANGELOG.md',
						attrs: { target: '_blank', rel: 'noopener' },
					},
				]),
			],
		}),
	],
});
