'use client';

import { InputProps } from '@/app/types/global.types';
import clsx from 'clsx';

export default function Input({
	type,
	name,
	placeholder = 'Enter something...',
	className,
	value,
	required,
	onChange,
}: InputProps) {
	return type === 'textarea' ? (
		<textarea
			id={name}
			name={name}
			minLength={2}
			maxLength={450}
			placeholder={placeholder}
			className={className}
			style={{ width: '100%' }}
			value={value ?? ''}
			required={required}
			onChange={onChange}
		/>
	) : (
		<input
			id={name}
			type={type}
			name={name}
			placeholder={placeholder}
			value={value ?? ''}
			required={required}
			onChange={onChange}
			className={clsx(
				'min-h-[32px] px-[16px] py-[9px] text-start bg-surface border border-border rounded-[7px] text-white placeholder:text-[#595959]',
				className,
			)}
			style={{ width: '100%' }}
		/>
	);
}
