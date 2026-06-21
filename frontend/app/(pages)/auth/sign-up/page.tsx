'use client';

import Form from '@/app/components/Form';
import BackButton from '@/app/components/ui/BackButtonNav';
import { formInputs } from '@/app/data/data';
import { SignupFormData } from '@/app/types/types';
import { useState } from 'react';

export default function SignUp() {
	const [signupData, setSignupData] = useState<SignupFormData>({
		username: '',
		password: '',
		name: '',
		acceptsPrivacyPolicy: false,
	});

	const handleSignup = () => {};

	return (
		<div className='flex-1 p-10 w-full flex flex-col justify-start items-start gap-10'>
			<BackButton />

			<main className='flex-1 w-full flex flex-col justify-center items-center'>
				<div className='flex flex-col justify-center items-center gap-5'>
					<h2>Sign Up</h2>

					<div className='flex-1 w-full'>
						<Form
							onSubmit={handleSignup}
							inputs={formInputs}
							bttnText='Sign Up'
							setFormData={(data) =>
								setSignupData((prev) => ({ ...prev, ...data }))
							}
						/>
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
