import Form from '@/app/components/Form';
import BackButton from '@/app/components/ui/BackButtonNav';
import { formInputs } from '@/app/data/data';

export default function SignUp() {
	return (
		<div className='flex-1 p-10 w-full flex flex-col justify-start items-start gap-10'>
			<BackButton />

			<main className='flex-1 w-full flex flex-col justify-center items-center'>
				<div className='flex flex-col justify-center items-center gap-5'>
					<h2>Sign Up</h2>

					<div className='flex-1 w-full'>
						<Form inputs={formInputs} bttnText='Sign Up' />
					</div>

					<p className='mt-5'>
						Have an account?{' '}
						<span className='underline underline-offset-2 hover:opacity-80 transition-opacity duration-300 ease-in-out'>
							Login
						</span>
					</p>
				</div>
			</main>
		</div>
	);
}
