'use client';

import Dropzone from '@/app/components/Dropzone';
import Wrapper from '@/app/components/Wrapper';
import { useState } from 'react';
import { toast } from 'sonner';

export default function UploadPage() {
	const [file, setFile] = useState<File>();
	const [parsedDocumentString, setParsedDocumentString] = useState('');
	const [generatedLetter, setGeneratedLetter] = useState('');
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState('');
	const [disabled, setDisabled] = useState(false);

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

			const parsedDocument = await resp.json();
			if (!parsedDocument) {
				setError('Document was not successfully returned');
				return;
			}

			setParsedDocumentString(parsedDocument);
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

	const handleCoverLetterGeneration = async () => {
		setError('');
		setSuccess(false);
		setDisabled(true);
		setLoading(true);

		try {
			const resp = await fetch('/api/generate');
		} catch (error) {
			return setError(
				error instanceof Error ? error.message : `${error}`,
			);
		} finally {
			setDisabled(false);
			setLoading(false);
		}
	};

	return (
		<Wrapper>
			<main className='flex-1 h-full flex flex-col items-center justify-center'>
				<div className='w-full h-full card card--col card--center'>
					<div className='max-w-[50%] flex flex-col gap-10'>
						<div>
							<h2 className='tracking-tighter'>Upload File</h2>
							<p>
								Take advantage of our AI model and file below,
								have our model review your document and return
								detailed, job-ready overview to help you on your
								journey.
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
						</div>
					</div>
				</div>
			</main>
		</Wrapper>
	);
}
