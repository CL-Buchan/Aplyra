'use client';

import { ProfileCardProps } from '../types/global.types';
import { createClient } from '../services/supabase/client';
import { useState } from 'react';
import { toast } from 'sonner';
import posthog from 'posthog-js';
import ProfileCircle from './profile/ProfileCircle';
import { useProfileContext } from './profile/ProfileContext';
import { ChevronDown, ChevronUp } from '@untitledui/icons';

export default function ProfileCard({
	user,
	userLoggedIn,
	pathname,
}: ProfileCardProps) {
	const [isLoading, setIsLoading] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);
	const supabase = createClient();
	const { profileImageUrl, displayName } = useProfileContext();

	async function signUserOut() {
		setIsLoading(true);
		const { error } = await supabase.auth.signOut({ scope: 'local' });

		if (error) {
			toast.error('Failed to sign out.');
		} else {
			posthog.reset();
		}

		setIsLoading(false);
	}

	return (
		<>
			{userLoggedIn && (
				<div className='relative w-full'>
					<button
						type='button'
						onClick={() => setMenuOpen((open) => !open)}
						aria-expanded={menuOpen}
						className='flex w-full flex-row items-center justify-between gap-2 rounded-[7px] px-1.5 py-1 transition-colors duration-200 hover:bg-white/10'>
						<div className='flex min-w-0 flex-row items-center gap-2.5'>
							<span className='relative shrink-0'>
								<ProfileCircle profileImage={profileImageUrl} />
								<span className='absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-black' />
							</span>
							<p className='truncate text-left text-sm'>
								{displayName || user?.email}
							</p>
						</div>

						<div className='flex shrink-0 flex-col items-center gap-0'>
							<ChevronUp color='var(--color-muted)' size={15} />
							<ChevronDown color='var(--color-muted)' size={15} />
						</div>
					</button>

					{menuOpen && (
						<div className='absolute bottom-full left-0 mb-2 w-full overflow-hidden rounded-[7px] border border-white/10 bg-black/90 shadow-[0_24px_60px_-8px_rgba(0,0,0,0.6)] backdrop-blur-xl'>
							<button
								type='button'
								disabled={isLoading}
								onClick={signUserOut}
								className='w-full px-3 py-2 text-left text-sm text-[#888888] transition-colors duration-200 hover:bg-white/10 hover:text-white disabled:opacity-50'>
								{isLoading ? 'Signing out…' : 'Sign out'}
							</button>
						</div>
					)}
				</div>
			)}
		</>
	);
}
