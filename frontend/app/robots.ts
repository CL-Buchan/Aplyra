import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const host_site = 'https://aplyra.io/';
	return {
		rules: { userAgent: '*', allow: '/' },
		sitemap: `${host_site}`,
	};
}
