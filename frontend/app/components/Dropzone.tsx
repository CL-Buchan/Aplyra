import { DropzoneProps } from '../types/types';
import clsx from 'clsx';

export default function Dropzone({
	file,
	error,
	loading = false,
	size = 'sm',
	onFileSelect,
}: DropzoneProps) {
	const sizeMap = {
		sm: 'min-w-100 min-h-50',
		md: 'min-w-150 min-h-100',
		lg: 'min-w-200 min-h-150',
	};
	return (
		<div
			className={clsx(
				'relative flex justify-center items-center border border-dashed rounded-xl',
				sizeMap[size],
				error
					? 'border-red-600 bg-red-600/5'
					: 'border-white/20 bg-white/5',
			)}>
			<input
				type='file'
				name='dropzone'
				accept='.pdf, .docx'
				className='inset-0 absolute opacity-0'
				onChange={(e) => onFileSelect(e.target.files?.[0])}
			/>

			{error ? (
				<p className='text-red-500'>{error}</p>
			) : loading ? (
				<p>Loading...</p>
			) : file ? (
				<p>
					<span className='text-green-500'>{file.name}</span> was
					uploaded
				</p>
			) : (
				<p>No file chosen, Select a file</p>
			)}
		</div>
	);
}
