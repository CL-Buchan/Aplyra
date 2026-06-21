'use client';

import Form from '@/app/components/Form';
import BackButton from '@/app/components/ui/BackButtonNav';
import { formInputs } from '@/app/data/data';
import { LoginFormData } from '@/app/types/types';
import { useState } from 'react';

export default function Login() {
	const [loginData, setLoginData] = useState<LoginFormData>({
		username: '',
		password: '',
	});

	const handleLogin = () => {};

	return (
		<div className='flex-1 p-10 w-full flex flex-col justify-start items-start gap-10'>
			<BackButton />

			<main className='flex-1 w-full flex flex-col justify-center items-center'>
				<div className='flex flex-col justify-center items-center gap-5'>
					<h2>Login</h2>

					<div className='flex-1 w-full'>
						<Form
							onSubmit={handleLogin}
							inputs={formInputs}
							bttnText='Login'
							setFormData={setLoginData}
						/>
					</div>

					<p className='mt-5'>
						Do not have an account?{' '}
						<span className='underline underline-offset-2 hover:opacity-80 transition-opacity duration-300 ease-in-out'>
							Signup
						</span>
					</p>
				</div>
			</main>
		</div>
	);
}
