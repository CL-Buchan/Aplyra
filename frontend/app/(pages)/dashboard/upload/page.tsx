'use client';

import { startLetterGeneration } from '@/app/(pages)/dashboard/upload/actions';
import Dropzone from '@/app/components/Dropzone';
import Input from '@/app/components/ui/Input';
import Wrapper from '@/app/components/Wrapper';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { toast } from 'sonner';
import posthog from 'posthog-js';
import { Coins03, SearchMd } from '@untitledui/icons';
import Pill from '@/app/components/ui/Pill';
import ProfileBadge from '@/app/components/ProfileBadge';
import { createClient } from '@/app/services/supabase/client';
import { AuthenticatedUser } from '@/app/types/global.types';

function UploadPageContent() {
	const router = useRouter();
	const supabase = createClient();
	const searchParams = useSearchParams();
	const applicationIdParam = searchParams.get('applicationId');
	const applicationId = applicationIdParam
		? Number(applicationIdParam)
		: undefined;
	const [file, setFile] = useState<File>();
	const [jobDescription, setJobDescription] = useState('');
	const [parsedLetterString, setParsedLetterString] = useState('');
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState('');
	const [disabled, setDisabled] = useState(false);
	const [checkingAuth, setCheckingAuth] = useState(true);
	const [authUser, setAuthUser] = useState<AuthenticatedUser | null>(null);
	const availableCredits = 0;

	useEffect(() => {
		const checkUser = async () => {
			const { data, error } = await supabase.auth.getUser();
			if (error || !data.user) return router.push('/auth/login');
			setAuthUser({ id: data.user.id, email: data.user.email ?? '' });
			setCheckingAuth(false);
		};
		checkUser();

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((event) => {
			switch (event) {
				case 'SIGNED_OUT':
					router.push('/auth/login');
					break;
				default:
					break;
			}
		});

		return () => subscription.unsubscribe();
	}, [supabase.auth]);

	const handleFileUpload = async (file: File | undefined) => {
		setError('');
		setSuccess(false);
		setDisabled(true);
		setLoading(true);
		setFile(file);

		if (!file) {
			setError('Could not set file');
			setDisabled(false);
			setLoading(false);
			return;
		}

		// Add the uploaded file to the formdata object
		// to send as multipart/form-data to py endpoint
		const formData = new FormData();
		formData.append('file', file);

		try {
			const resp = await fetch('/api/upload', {
				method: 'POST',
				body: formData,
			});
			if (!resp.ok) return setError('Error sending file');

			const parsedDocument: { filename: string; text: string } =
				await resp.json();
			if (!parsedDocument?.text) {
				setError('Document was not successfully returned');
				return;
			}

			setParsedLetterString(parsedDocument.text);
			posthog.capture('document_uploaded', {
				file_type: file.type || 'unknown',
				has_job_description: Boolean(jobDescription.trim()),
			});
			setSuccess(true);
			toast.success(`${file.name} was uploaded successfully`);
		} catch (error) {
			return setError(
				error instanceof Error ? error.message : `${error}`,
			);
		} finally {
			setDisabled(false);
			setLoading(false);
		}
	};

	// Watches for a successfully parsed document, then kicks off generation
	// and redirects to the letter's page before generation completes.
	useEffect(() => {
		if (!success || !parsedLetterString) return;

		const generate = async () => {
			setDisabled(true);
			setLoading(true);

			const result = await startLetterGeneration(
				parsedLetterString,
				jobDescription,
				applicationId,
			);

			if (result.error || !result.id) {
				setError(result.error ?? 'Error attempting letter generation');
				setDisabled(false);
				setLoading(false);
				return;
			}

			// Fire and forget - the letter page polls for the result.
			fetch('/api/generate', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					letterId: result.id,
					cv_text: parsedLetterString,
					job_description: jobDescription,
				}),
			}).catch(() => {});

			router.push(`/dashboard/letters/${result.id}`);
		};

		generate();
	}, [success, parsedLetterString, jobDescription, applicationId, router]);

	if (checkingAuth) {
		return null;
	}

	return (
		<Wrapper>
			<div className='w-full h-screen flex flex-col flex-1 items-start justify-center font-sans'>
				{/* Top bar */}
				<div className='w-full h-16 py-4 px-8 flex justify-between items-center border-b border-b-white/10 glass'>
					<div className='relative w-[320px]'>
						<SearchMd
							size={20}
							color='var(--color-muted)'
							className='absolute left-3 top-1/2 -translate-y-1/2'
						/>
						<input
							type='text'
							name='search'
							placeholder='Search applications...'
							className='w-full py-2 pl-9 pr-4 border border-white/20 rounded-lg text-sm'
						/>
					</div>
					<div className='flex flex-row items-center gap-2.5'>
						<Pill
							variant='primary'
							className='py-1.5! px-3! flex flex-row items-center gap-2 text-xs text-muted rounded-full! bg-white/5! border border-[#27272a]!'
							styles={{ hexColour: '121214', opacity: '100%' }}>
							<Coins03
								size={20}
								color='var(--color-purple-500)'
							/>
							<p>{availableCredits} credits remaining</p>
						</Pill>
						<ProfileBadge initialUser={authUser} />
					</div>
				</div>

				<main className='relative w-full px-10 py-8 flex-1 flex flex-col justify-start items-start gap-12.5'>
					<div className='max-w-200 h-full card card--col card--start'>
						<div className='flex flex-col gap-10'>
							<div>
								<h2 className='tracking-tighter text-lg'>
									Upload Documents
								</h2>
								<p>
									Take advantage of our AI model and file
									below, have our model review your document
									and return detailed, job-ready overview to
									help you on your journey.
								</p>
							</div>

							<div className='w-full flex flex-col items-center gap-10'>
								<Dropzone
									file={file}
									error={error}
									success={success}
									loading={loading}
									disabled={disabled}
									onFileSelect={handleFileUpload}
								/>

								<label className='w-full flex flex-col gap-2 text-sm'>
									<span>Job description (optional)</span>
									<Input
										type='textarea'
										name='job_description'
										placeholder='Paste the job description here to tailor your cover letter...'
										value={jobDescription}
										onChange={(event) =>
											setJobDescription(
												event.target.value,
											)
										}
									/>
								</label>
							</div>
						</div>
					</div>
				</main>
			</div>
		</Wrapper>
	);
}

export default function UploadPage() {
	return (
		<Suspense>
			<UploadPageContent />
		</Suspense>
	);
}
