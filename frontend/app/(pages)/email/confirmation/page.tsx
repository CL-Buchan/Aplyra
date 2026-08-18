import BackButton from '@/app/components/ui/BackButton';
import Wrapper from '@/app/components/Wrapper';

export default function UnsubscribedConfirmation() {
	return (
		<div className='flex-1 p-10 w-full flex flex-col justify-start items-start gap-10'>
			<BackButton />

			<main className='flex-1 w-full flex flex-col justify-center items-center'>
				<div className='flex flex-col justify-center items-center gap-5'>
					<h2>Successfully Unsubscribed</h2>
					<p>We are sorry to see you go!</p>
					<p>
						You have been successfully unsubscribed from our
						waitlist.
					</p>
				</div>
			</main>
		</div>
	);
}
