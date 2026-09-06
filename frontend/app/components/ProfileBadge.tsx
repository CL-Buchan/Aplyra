'use client';

import { ProfileBadgeProps } from '../types/global.types';
import ProfileCircle from './profile/ProfileCircle';
import { useProfileContext } from './profile/ProfileContext';

export default function ProfileBadge({ initialUser }: ProfileBadgeProps) {
	const { profileImageUrl, displayName } = useProfileContext();

	return (
		<div className='flex flex-row items-center gap-2.5 h-7 border-l border-white/15 pl-2.5'>
			<ProfileCircle profileImage={profileImageUrl} />

			<p className='text-sm text-zinc-200'>
				{displayName || initialUser?.email || 'User'}
			</p>
		</div>
	);
}
