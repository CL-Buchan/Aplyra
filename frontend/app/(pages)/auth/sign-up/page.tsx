'use client';

import Form from '@/app/components/Form';
import BackButton from '@/app/components/ui/BackButton';
import { formInputs } from '@/app/data/data';
import { SignupFormData } from '@/app/types/global.types';
import Link from 'next/link';
import posthog from 'posthog-js';
import { useState } from 'react';
import { toast } from 'sonner';

export default function SignUp() {
	const [signupData, setSignupData] = useState<SignupFormData>({
		username: '',
		password: '',
		name: '',
		acceptsPrivacyPolicy: false,
	});
	const [errorMsg, setErrorMsg] = useState('');
	const [isLoading, setLoading] = useState(false);

	const handleSignup = async () => {
		setErrorMsg('');
		setLoading(true);

		try {
			const resp = await fetch('/api/user/auth', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					user: {
						username: signupData.username ?? '',
						password: signupData.password ?? '',
					},
					mode: 'sign-up',
				}),
			});
			const data = await resp.json();

			if (!resp.ok || data.error) {
				setErrorMsg(data.error ?? `Request failed (${resp.status})`);
				setLoading(false);
				return;
			}

			const { user } = data;
			if (user) {
				posthog.identify(user.id, {
					email: user.email ?? signupData.username,
				});
				posthog.capture('user_signed_up');
			}
		} catch (error) {
			toast.error(
				`Error: ${error instanceof Error ? error.message : error}`,
			);
			setLoading(false);
			return;
		}

		// Reset form data
		setSignupData({
			username: '',
			password: '',
			name: '',
			acceptsPrivacyPolicy: false,
		});
		setLoading(false);
		return;
	};

	return (
		<div className='min-h-screen w-full p-10 flex-1 flex flex-col justify-start items-start gap-10'>
			<BackButton />

			<main className='w-full flex-1 flex flex-col justify-center items-center'>
				<div className='w-full max-w-[40%] flex flex-col justify-center items-center gap-5'>
					<h2>Sign Up</h2>

					<div className='w-full'>
						<Form
							onSubmit={handleSignup}
							inputs={formInputs}
							bttnText='Sign Up'
							formData={signupData}
							setFormData={setSignupData}
							isLoading={isLoading}
							isError={!!errorMsg}
							errorMsg={errorMsg}
						/>
					</div>

					<div className='w-full flex flex-col items-center gap-1'>
						<p className='mt-5 text-muted'>
							Already have an account?{' '}
							<Link
								href='/auth/login'
								className='underline underline-offset-2 hover:opacity-80 transition-opacity duration-300 ease-in-out'>
								Login
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
