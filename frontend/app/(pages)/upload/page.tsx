'use client';

import Dropzone from '@/app/components/Dropzone';
import BackButtonNav from '@/app/components/ui/BackButtonNav';
import { CheckCircle, XCircle } from '@untitledui/icons';
import { useState } from 'react';
import { toast } from 'sonner';

export default function UploadPage() {
	const [file, setFile] = useState<File>();
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState('');
	const [disabled, setDisabled] = useState(false);

	const handleFileUpload = (file: File | undefined) => {
		setLoading(true);

		if (file && file?.name) {
			setFile(file);
			setSuccess(true);
			toast.success(`${file?.name} was uploaded successfully`);
			setDisabled(true);
		}

		setLoading(false);
	};

	return (
		<div className='p-10 flex-1 w-full flex flex-col justify-start font-sans text-zinc-50 bg-black'>
			<BackButtonNav />

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

							{success && <CheckCircle color='green' />}
							{error && <XCircle color='red' />}
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
