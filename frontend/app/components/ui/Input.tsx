'use client';

import { InputProps } from '@/app/types/types';
import clsx from 'clsx';
import { useState } from 'react';

export default function Input({
	type,
	placeholder = 'Enter something...',
	className,
}: InputProps) {
	const [hasValue, setHasValue] = useState(false);

	return type === 'textarea' ? (
		<textarea
			minLength={2}
			maxLength={450}
			placeholder={placeholder}
			className={className}
			style={{ width: '100%' }}
		/>
	) : (
		<input
			type={type}
			placeholder={placeholder}
			onChange={(e) => setHasValue(e.target.value !== '')}
			className={clsx(
				'min-h-[32px] px-[16px] py-[9px] text-start bg-surface border border-border rounded-[7px] text-white placeholder:text-[#595959]',
				type === 'date' && hasValue && 'has-value',
				className,
			)}
			style={{ width: '100%' }}
		/>
	);
}
