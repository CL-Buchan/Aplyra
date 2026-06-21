'use client';

import { Key01, User01 } from '@untitledui/icons';
import { FormProps } from '../types/types';
import Button from './ui/Button';

export default function Form({
	title,
	description,
	inputs,
	bttnText,
	onSubmit,
	setFormData,
}: FormProps) {
	return (
		<div className='flex flex-col justify-center items-center gap-5'>
			{(title || description) && (
				<div className='flex flex-col gap-2.5'>
					<h1>{title ?? ''}</h1>
					<p>{description ?? ''}</p>
				</div>
			)}

			<form
				onSubmit={onSubmit}
				className='flex flex-col justify-center items-center gap-5'>
				{inputs && inputs.length > 0 ? (
					inputs.map(({ type, label, name, placeholder }, index) => (
						<div key={index} className='flex flex-col gap-1.25'>
							<label htmlFor={name} className='tracking-tight'>
								{label}:{' '}
							</label>

							<div className='pl-2.5 flex flex-row items-center gap-1.25 border border-black/20 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/5 rounded-3xl'>
								{name === 'password' ? (
									<Key01 size={20} opacity='25%' />
								) : name === 'username' ? (
									<User01 size={20} opacity='25%' />
								) : (
									<></>
								)}

								<input
									type={type}
									name={name}
									placeholder={placeholder}
									onChange={(e) =>
										setFormData((prev) => ({
											...prev,
											[e.target.name]: e.target.value,
										}))
									}
									className='text-black dark:text-white'
								/>
							</div>
						</div>
					))
				) : (
					<p>No form inputs</p>
				)}

				<Button type='submit'>{bttnText ?? 'Add text'}</Button>
			</form>
		</div>
	);
}
