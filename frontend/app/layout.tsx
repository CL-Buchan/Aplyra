import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import AppShell from './components/AppShell';
import { getCurrentUser } from './services/auth/getCurrentUser';
import './globals.css';
import './styles/main.scss';
import { Toaster } from 'sonner';
import { Analytics } from '@vercel/analytics/next';
import {
	SITE_DESCRIPTION,
	SITE_KEYWORDS,
	SITE_NAME,
	SITE_TITLE,
	SITE_URL,
	SOCIAL,
} from './config/site';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	metadataBase: new URL(SITE_URL),
	title: {
		default: SITE_TITLE,
		template: `%s — ${SITE_NAME}`,
	},
	description: SITE_DESCRIPTION,
	keywords: SITE_KEYWORDS,
	applicationName: SITE_NAME,
	authors: [{ name: 'Callam Buchan' }],
	creator: 'Callam Buchan',
	publisher: SITE_NAME,
	category: 'technology',
	formatDetection: { email: false, address: false, telephone: false },
	alternates: { canonical: '/' },
	openGraph: {
		type: 'website',
		url: SITE_URL,
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		siteName: SITE_NAME,
		locale: 'en_US',
	},
	twitter: {
		card: 'summary_large_image',
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: SOCIAL.twitterHandle,
		creator: SOCIAL.twitterHandle,
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-image-preview': 'large',
			'max-snippet': -1,
			'max-video-preview': -1,
		},
	},
};

export default async function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	const user = await getCurrentUser();

	return (
		<html
			lang='en'
			className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth scrollbar-none`}
			data-scroll-behavior='smooth'>
			<body className='min-h-full flex flex-col overflow-x-hidden'>
				<AppShell
					initialUser={
						user ? { id: user.id, email: user.email ?? '' } : null
					}>
					{children}
				</AppShell>

				<Toaster />
				<Analytics />
			</body>
		</html>
	);
}
