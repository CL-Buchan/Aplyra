'use client';

import Dropzone from '@/app/components/Dropzone';
import { useState } from 'react';

export default function UploadPage() {
	const [file, setFile] = useState<File>();

	return <Dropzone file={file} onFileSelect={setFile} />;
}
