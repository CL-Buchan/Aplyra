'use client';

import Form from '@/app/components/Form';
import BackButton from '@/app/components/ui/BackButton';
import { formInputs } from '@/app/data/data';
import { createClient } from '@/app/services/supabase/client';
import { LoginFormData } from '@/app/types/types';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Login() {
	const [loginData, setLoginData] = useState<LoginFormData>({
		username: '',
		password: '',
	});
	const [isLoading, setLoading] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');

	const supabase = createClient();

	const handleLogin = async () => {
		setLoading(true);

		if (!loginData.username) {
			toast.error('Please enter username');
			return;
		}
		if (!loginData.password) {
			toast.error('Please enter password');
			return;
		}

		// Log user in using credentials - w/ password
		const { data, error } = await supabase.auth.signInWithPassword({
			email: loginData.username,
			password: loginData.password,
		});

		if (error) {
			toast.error('Could not log user in!');
			return;
		}

		// Reset the values once logged in
		setLoginData({ username: '', password: '' });

		setLoading(false);
		return;
	};

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
							formData={loginData}
							setFormData={setLoginData}
						/>
					</div>

					<div className='flex flex-col items-center gap-1'>
						<p className='mt-5 text-muted'>
							Do not have an account?{' '}
							<span className='underline underline-offset-2 hover:opacity-80 transition-opacity duration-300 ease-in-out'>
								Signup
							</span>
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
