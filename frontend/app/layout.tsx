import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Nav from './components/ui/Nav';
import './globals.css';
import './styles/main.scss';
import { Toaster } from 'sonner';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Trove - job application tracker',
	description:
		'Keep on top of your current job applications, see them all in one place, review, delete, follow up. Everything you need, here, at Trove.',
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html
			lang='en'
			className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth scrollbar-none`}>
			<body className='min-h-full flex flex-col'>
					<Nav />

				<div className='w-full flex-1 flex flex-col justify-center items-center'>
					{children}
				</div>

				<Toaster />
			</body>
		</html>
	);
}
