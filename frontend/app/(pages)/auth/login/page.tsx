'use client';

import Form from '@/app/components/Form';
import BackButton from '@/app/components/ui/BackButton';
import { formInputs } from '@/app/data/data';
import { createClient } from '@/app/services/supabase/client';
import { LoginFormData } from '@/app/types/global.types';
import Link from 'next/link';
import posthog from 'posthog-js';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Login() {
	const [loginData, setLoginData] = useState<LoginFormData>({
		username: '',
		password: '',
	});
	const [isLoading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const supabase = createClient();

	const handleLogin = async () => {
		setError('');
		setLoading(true);

		let errorMsg = '';
		if (!loginData.username) {
			errorMsg = 'Please enter username';
			setError(errorMsg);
			toast.error(errorMsg);
			return;
		}
		if (!loginData.password) {
			errorMsg = 'Please enter password';
			setError(errorMsg);
			toast.error(errorMsg);
			return;
		}

		// Log user in using credentials - w/ password
		const {
			data: { user },
			error,
		} = await supabase.auth.signInWithPassword({
			email: loginData.username,
			password: loginData.password,
		});

		if (error || !user) {
			errorMsg = 'User could not be logged in';
			setError(errorMsg);
			toast.error(errorMsg);
			setLoading(false);
			return;
		}

		posthog.identify(user.id, { email: user.email ?? loginData.username });
		posthog.capture('user_logged_in');

		// Reset the values once logged in
		setLoginData({ username: '', password: '' });
		setLoading(false);
		return;
	};

	return (
		<div className='min-h-screen w-full p-10 flex-1 flex flex-col justify-start items-start gap-10'>
			<BackButton />

			<main className='w-full flex-1 flex flex-col justify-center items-center'>
				<div className='w-full max-w-[40%] flex flex-col justify-center items-center gap-5'>
					<h2>Login</h2>

					<div className='w-full'>
						<Form
							onSubmit={handleLogin}
							inputs={formInputs}
							bttnText='Login'
							formData={loginData}
							setFormData={setLoginData}
							isLoading={isLoading}
						/>

						{error && (
							<p className='mt-5 text-red-500 text-center'>
								{error}
							</p>
						)}
					</div>

					<div className='w-full flex flex-col items-center gap-1'>
						<p className='mt-5 text-muted'>
							Do not have an account?{' '}
							<Link
								href='/auth/sign-up'
								className='underline underline-offset-2 hover:opacity-80 transition-opacity duration-300 ease-in-out'>
								Signup
							</Link>
						</p>
						<p className='text-muted'>
							Forgot password?{' '}
							<span className='underline underline-offset-2 hover:opacity-80 transition-opacity duration-300 ease-in-out'>
								Reset Password
							</span>
						</p>
					</div>
				</div>
			</main>
		</div>
	);
}
