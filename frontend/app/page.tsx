import Link from 'next/link';
import Pill from './components/ui/Pill';
import Button from './components/ui/Button';

export default function Home() {
	const features = [
		'Track job applications',
		'Manage statuses',
		'AI cover letter generation and resume compiling',
	];

	return (
		<div className='w-full flex flex-col flex-1 items-center justify-center font-sans bg-zinc-50 dark:bg-black'>
			<main className='max-w-200 py-25 flex flex-col justify-start items-center gap-25'>
				<div className='card card--col card--center'>
					<Pill text='Welcome' />
					<h1 className='text-4xl md:text-6xl lg:text-8xl tracking-tighter font-semibold text-transparent bg-linear-90 from-10% from-gray-500 via-50% via-white to-gray-800 to-100% bg-clip-text'>
						Welcome, to Trove
					</h1>
					<p>Apply for more. The tracking is done for you.</p>

					<div className='w-full flex justify-center gap-2.5'>
						<Button>
							<Link href={''}>Get Started</Link>
						</Button>
						<Button variant='secondary'>
							<Link href={''}>More Info</Link>
						</Button>
					</div>
				</div>

				<div className='w-full flex flex-row justify-center items-start gap-10'>
					{/* Image placeholder */}
					<div className='min-h-full h-50 w-50 bg-white/10 rounded-xl' />
					<div className='flex-1 card card--col'>
						<h2 className='text-xl md:text-3xl lg:text-5xl tracking-tighter font-semibold'>
							Our Features
						</h2>
						<ul className='h-full space-y-7 list-disc list-inside'>
							{features.map((text, index) => (
								<li key={index} className='uppercase'>
									{text}
								</li>
							))}
						</ul>
					</div>
				</div>
				<div className='w-full card card--col card--start banner-card'>
					<h2 className='text-xl md:text-3xl lg:text-5xl tracking-tighter font-semibold'>
						More Information
					</h2>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipisicing
						elit. Adipisci necessitatibus provident ullam excepturi
						distinctio quia voluptas ratione alias saepe dolore
						odit, possimus quasi sunt a numquam, quas fugit
						molestias consequuntur.
					</p>
				</div>
			</main>
		</div>
	);
}
