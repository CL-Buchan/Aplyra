import Card from '@/app/components/ui/Card';
import Pill from '@/app/components/ui/Pill';

export default function Applications() {
	return (
		<div className='w-full flex flex-col flex-1 items-center justify-center font-sans bg-zinc-50 dark:bg-black'>
			<main className='max-w-200 py-25 flex flex-col justify-start items-start gap-25'>
				<div className=''>
					<Pill text='10 Jobs' />
					<h2>Your Applications</h2>
				</div>
				<div className='w-full'>
					<Card size='sm' />
				</div>
			</main>
		</div>
	);
}
