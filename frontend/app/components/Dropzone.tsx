'use client';

import { CheckCircle, XCircle } from '@untitledui/icons';
import { DropzoneProps } from '../types/global.types';
import clsx from 'clsx';
import { useEffect, useMemo } from 'react';

export default function Dropzone({
	file,
	error,
	success,
	loading = false,
	size = 'sm',
	disabled,
	onFileSelect,
	accept = '.pdf, .docx',
	label = 'No file chosen, Select a .pdf or .docx file',
}: DropzoneProps) {
	const isImage = file?.type.startsWith('image/');
	const previewUrl = useMemo(
		() => (isImage && file ? URL.createObjectURL(file) : undefined),
		[isImage, file],
	);

	useEffect(() => {
		return () => {
			if (previewUrl) URL.revokeObjectURL(previewUrl);
		};
	}, [previewUrl]);

	const sizeMap = {
		sm: 'min-w-100 min-h-50',
		md: 'min-w-150 min-h-100',
		lg: 'min-w-200 min-h-150',
	};
	return (
		<div
			className={clsx(
				'relative w-full flex justify-center items-center border border-dashed rounded-xl transition-colors duration-300 ease-in-out tracking-tight font-sans',
				sizeMap[size],
				error
					? 'border-red-600 bg-red-600/5 hover:bg-red-600/10'
					: success
						? 'border-green-600 bg-green-600/5 hover:bg-green-600/10'
						: 'border-muted bg-white/5 hover:bg-white/10',
			)}>
			<input
				type='file'
				name='dropzone'
				disabled={disabled}
				accept={accept}
				className='inset-0 absolute opacity-0'
				onChange={(e) => onFileSelect(e.target.files?.[0])}
			/>

			{error ? (
				<div className='flex items-center gap-2.5'>
					<p className='text-red-500'>{error}</p>
					<XCircle color='red' width={20} height={20} />
				</div>
			) : loading ? (
				<p>Loading...</p>
			) : file && previewUrl ? (
				// eslint-disable-next-line @next/next/no-img-element
				<img
					src={previewUrl}
					alt={file.name}
					className='size-full rounded-xl object-cover'
				/>
			) : file ? (
				<div>
					<p>
						<span className='text-green-500'>{file.name}</span> was
						uploaded
					</p>
					<CheckCircle color='green' width={20} height={20} />
				</div>
			) : (
				<p className='text-muted'>{label}</p>
			)}
		</div>
	);
}
