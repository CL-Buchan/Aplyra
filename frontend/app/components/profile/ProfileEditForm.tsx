'use client';

import { updateUserProfile } from '@/app/(pages)/user/profile/actions';
import { ProfileEditformProps } from '@/app/types/global.types';
import Button from '@/app/components/ui/Button';
import { FormEvent, useTransition } from 'react';
import { toast } from 'sonner';

export default function ProfileEditForm({
	user,
	setUser,
}: ProfileEditformProps) {
	const [isPending, startTransition] = useTransition();

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		startTransition(async () => {
			const result = await updateUserProfile({
				name: user.name,
				email: user.email,
			});

			if (result.success) {
				toast.success('Profile updated');
			} else {
				toast.error(result.error ?? 'Failed to update profile');
			}
		});
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='flex w-full flex-col gap-6 rounded-2xl border border-black/10 bg-white/60 p-6 dark:border-white/15 dark:bg-white/5'>
			<label className='flex flex-col gap-2 text-sm'>
				<span>Username:</span>
				<input
					value={user.name ?? ''}
					placeholder='Enter username'
					onChange={(event) =>
						setUser((prev) => ({
							...prev,
							name: event.target.value,
						}))
					}
					className='rounded-xl border border-black/10 bg-transparent px-4 py-2.5 dark:border-white/15'
				/>
			</label>

			<label className='flex flex-col gap-2 text-sm'>
				<span>Email:</span>
				<input
					value={user.email ?? ''}
					placeholder='Enter email'
					onChange={(event) =>
						setUser((prev) => ({
							...prev,
							email: event.target.value,
						}))
					}
					className='rounded-xl border border-black/10 bg-transparent px-4 py-2.5 dark:border-white/15'
				/>
			</label>

			<Button type='submit' text={isPending ? 'Saving…' : 'Update'} />
		</form>
	);
}
