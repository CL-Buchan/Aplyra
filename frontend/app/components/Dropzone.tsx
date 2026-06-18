import { DropzoneProps } from '../types/types';
import clsx from 'clsx';

export default function Dropzone({
	file,
	error,
	loading,
	onFileSelect,
}: DropzoneProps) {
	return (
		<div
			className={clsx(
				'relative min-w-100 min-h-50 flex justify-center items-center border border-dashed rounded-xl',
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
