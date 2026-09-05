import Image from 'next/image';
import { ProfileBadgeProps } from '../types/global.types';

export default function ProfileBadge({
	initialUser,
	profileImage,
}: ProfileBadgeProps) {
	return (
		<div className='flex flex-row items-center gap-2.5 h-7 border-l border-white/15 pl-2.5'>
			{profileImage ? (
				<Image
					src={profileImage}
					alt='Profile Image'
					loading='lazy'
					className='w-7 h-7 rounded-full object-cover bg-gray-400/50'
				/>
			) : (
				<div className='w-7 h-7 rounded-full object-cover bg-gray-400/50' />
			)}
			<p className='text-sm text-zinc-200'>{initialUser?.id ?? 'User N.'}</p>
		</div>
	);
}
