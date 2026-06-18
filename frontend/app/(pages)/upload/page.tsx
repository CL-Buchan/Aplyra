'use client';

import Dropzone from '@/app/components/Dropzone';
import { useState } from 'react';

export default function UploadPage() {
	const [file, setFile] = useState<File>();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	return (
		<Dropzone
			file={file}
			error={error}
			loading={loading}
			onFileSelect={setFile}
		/>
	);
}
