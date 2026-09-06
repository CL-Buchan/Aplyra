import { ProfileCircleProps } from '@/app/types/global.types';
import Image from 'next/image';

export default function ProfileCircle({
	profileImage,
	alt,
}: ProfileCircleProps) {
	return (
		<>
			{profileImage ? (
				<Image
					src={profileImage as string}
					alt={alt ? alt : 'Profile Image'}
					width={28}
					height={28}
					loading='lazy'
					className='h-7 w-7 shrink-0 rounded-full object-cover'
				/>
			) : (
				<div className='h-7 w-7 shrink-0 rounded-full bg-gray-400/50' />
			)}
		</>
	);
}
