'use client';

import { ArrowLeft } from '@untitledui/icons';
import Button from './Button';
import { useRouter } from 'next/navigation';
import { BackButtonNavProps } from '@/app/types/global.types';

export default function BackButton({ route = '/' }: BackButtonNavProps) {
	const router = useRouter();

	return (
		<Button variant='none' onClick={() => router.push(route)}>
			<div className='flex items-center gap-2.5 hover:text-white/50 transition-colors duration-300 ease-in-out'>
				<ArrowLeft /> Back
			</div>
		</Button>
	);
}
