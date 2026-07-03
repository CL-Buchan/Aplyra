'use client';

import Form from '@/app/components/Form';
import BackButton from '@/app/components/ui/BackButton';
import { formInputs } from '@/app/data/data';
import { createClient } from '@/app/services/supabase/client';
import { SignupFormData } from '@/app/types/types';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function SignUp() {
	const [signupData, setSignupData] = useState<SignupFormData>({
		username: '',
		password: '',
		name: '',
		acceptsPrivacyPolicy: false,
	});

	const supabase = createClient();

	const emailHosts = ['gmail', 'outlook', 'icloud', 'yahoo', 'student'];

	const handleSignup = async () => {
		if (!signupData.username.trim()) {
			toast.error('Enter username');
			return;
		}
		if (
			!signupData.username.trim().includes('@') ||
			!emailHosts.some((host) =>
				signupData.username.trim().toLowerCase().includes(host),
			)
		) {
			toast.error(
				'Username needs to be your email and include an @ symbol',
			);
			return;
		}
		if (!signupData.password.trim()) {
			toast.error('Enter password');
			return;
		}
		if (
			signupData.password.trim().length <= 6 ||
			!/[!#$%^&*]/.test(signupData.password.trim())
		) {
			toast.error(
				'Password length is not greater than 6 characters, and or does not contain special characters',
			);
			return;
		}

		const { error } = await supabase.auth.signUp({
			email: signupData.username.trim().toLowerCase(),
			password: signupData.password.trim(),
			options: {
				emailRedirectTo: `${window.location.origin}/api/supabase/auth`,
			},
		});

		if (error) {
			toast.error('Could not sign user up!');
			return;
		}

		// Reset form data
		setSignupData({
			username: '',
			password: '',
			name: '',
			acceptsPrivacyPolicy: false,
		});
		return;
	};

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
							formData={signupData}
							setFormData={setSignupData}
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
