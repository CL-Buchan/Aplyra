import type { Metadata } from 'next';
import {
	SITE_DESCRIPTION,
	SITE_NAME,
	SITE_TITLE,
	SITE_URL,
	SOCIAL,
} from './config/site';
import { FAQ_ITEMS } from './components/landing/faqData';
import JsonLd from './components/landing/JsonLd';
import LandingContent from './components/landing/LandingContent';
import { getWaitlistCount } from './services/waitlist/getWaitlistCount';

export const revalidate = 600;

export const metadata: Metadata = {
	title: SITE_TITLE,
	description: SITE_DESCRIPTION,
	alternates: { canonical: '/' },
};

function buildStructuredData() {
	const organization = {
		'@type': 'Organization',
		'@id': `${SITE_URL}/#organization`,
		name: SITE_NAME,
		url: SITE_URL,
		logo: `${SITE_URL}/logo_transparent.png`,
		sameAs: [SOCIAL.twitter, SOCIAL.github],
	};

	const website = {
		'@type': 'WebSite',
		'@id': `${SITE_URL}/#website`,
		url: SITE_URL,
		name: SITE_NAME,
		description: SITE_DESCRIPTION,
		publisher: { '@id': `${SITE_URL}/#organization` },
	};

	const software = {
		'@type': 'SoftwareApplication',
		name: SITE_NAME,
		applicationCategory: 'BusinessApplication',
		operatingSystem: 'Web',
		description: SITE_DESCRIPTION,
		url: SITE_URL,
		offers: {
			'@type': 'Offer',
			price: '0',
			priceCurrency: 'USD',
			description: 'Free early access for waitlist members.',
		},
		publisher: { '@id': `${SITE_URL}/#organization` },
	};

	const faq = {
		'@type': 'FAQPage',
		'@id': `${SITE_URL}/#faq`,
		mainEntity: FAQ_ITEMS.map(({ question, answer }) => ({
			'@type': 'Question',
			name: question,
			acceptedAnswer: { '@type': 'Answer', text: answer },
		})),
	};

	return {
		'@context': 'https://schema.org',
		'@graph': [organization, website, software, faq],
	};
}

export default async function Home() {
	const waitlistCount = await getWaitlistCount();

	return (
		<>
			<JsonLd data={buildStructuredData()} />
			<LandingContent waitlistCount={waitlistCount} />
		</>
	);
}
