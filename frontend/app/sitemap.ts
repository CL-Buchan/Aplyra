import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const host_site = 'https://aplyra.io/';
	return [
		{
			url: `${host_site}`,
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 1,
		},
		{
			url: `${host_site}/auth/login`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.8,
		},
		{
			url: `${host_site}/auth/sign-up`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.8,
		},
		{
			url: `${host_site}/dashboard/applications`,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 1,
		},
		{
			url: `${host_site}/dashboard/letters`,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 0.8,
		},
		{
			url: `${host_site}/dashboard/upload`,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 0.8,
		},
		{
			url: `${host_site}/dashboard/user/profile`,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 0.8,
		},
	];
}
