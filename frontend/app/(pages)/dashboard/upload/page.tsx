'use client';

import { startLetterGeneration } from '@/app/(pages)/dashboard/upload/actions';
import Dropzone from '@/app/components/Dropzone';
import Input from '@/app/components/ui/Input';
import Wrapper from '@/app/components/Wrapper';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { toast } from 'sonner';
import posthog from 'posthog-js';

function UploadPageContent() {
	const router = useRouter();
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
	const availableCredits = 0;

	const handleFileUpload = async (file: File | undefined) => {
		setError('');
		setSuccess(false);
		setDisabled(true);
		setLoading(true);
		// For access on the client ie. filename
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

	return (
		<Wrapper>
			<div className='w-full flex flex-col flex-1 items-center justify-center font-sans'>
				<div className='w-full flex justify-between items-center h-10 border-b border-b-white/10'>
					<input type='text' name='search' placeholder='Search...' />
					<div>
						<div>{availableCredits} credits remaining</div>
						{/* Insert profile badge */}
					</div>
				</div>
				<main className='relative max-w-200 py-25 flex flex-col justify-start items-start gap-12.5 w-full px-6'>
					<div className='w-full h-full card card--col card--center'>
						<div className='flex flex-col gap-10'>
							<div>
								<h2 className='tracking-tighter'>
									Upload File
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
