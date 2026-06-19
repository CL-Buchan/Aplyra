'use client';

import Dropzone from '@/app/components/Dropzone';
import Button from '@/app/components/ui/Button';
import { ArrowLeft } from '@untitledui/icons';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function UploadPage() {
	const [file, setFile] = useState<File>();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const router = useRouter();

	useEffect(() => {
		if (file && file?.name)
			toast.success(`${file?.name} was uploaded successfully`);
	}, [file]);

	return (
		<div className='inset-0 absolute p-10'>
			<Button variant='none' onClick={() => router.push('/')}>
				<div className='flex items-center gap-2.5 hover:text-white/50 transition-colors duration-300 ease-in-out'>
					<ArrowLeft /> Back
				</div>
			</Button>

			<div className='w-full h-full card card--col card--center'>
				<div className='max-w-[50%] flex flex-col gap-5'>
					<h2 className='tracking-tighter'>Upload File</h2>

					<Dropzone
						file={file}
						error={error}
						loading={loading}
						onFileSelect={setFile}
					/>
				</div>
			</div>
		</div>
	);
}
