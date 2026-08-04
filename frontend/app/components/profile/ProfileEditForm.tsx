'use client';

import { updateUserProfile } from '@/app/(pages)/user/profile/actions';
import { ProfileEditformProps } from '@/app/types/global.types';
import Button from '@/app/components/ui/Button';
import { useRouter } from 'next/navigation';
import { FormEvent, useState, useTransition } from 'react';
import { toast } from 'sonner';

export default function ProfileEditForm({ user }: ProfileEditformProps) {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const [formData, setFormData] = useState({
		name: user.name ?? '',
		email: user.email ?? '',
	});

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		startTransition(async () => {
			const result = await updateUserProfile({
				name: formData.name,
				email: formData.email,
			});

			if (result.success) {
				toast.success('Profile updated');
				router.refresh();
			} else {
				toast.error(result.error ?? 'Failed to update profile');
			}
		});
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='flex w-full flex-col gap-5 rounded-2xl border border-black/10 bg-white/60 p-6 dark:border-white/15 dark:bg-white/5'>
			<label className='w-full flex flex-col gap-2 text-sm'>
				<span>Username:</span>
				<input
					value={formData.name}
					placeholder='Enter username'
					onChange={(event) =>
						setFormData((prev) => ({
							...prev,
							name: event.target.value,
						}))
					}
					className='w-full rounded-xl border border-black/10 bg-transparent px-4 py-2.5 dark:border-white/15'
				/>
			</label>

			<label className='w-full flex flex-col gap-2 text-sm'>
				<span>Email:</span>
				<input
					value={formData.email}
					placeholder='Enter email'
					onChange={(event) =>
						setFormData((prev) => ({
							...prev,
							email: event.target.value,
						}))
					}
					className='w-full rounded-xl border border-black/10 bg-transparent px-4 py-2.5 dark:border-white/15'
				/>
			</label>

			<Button
				type='submit'
				text={isPending ? 'Saving…' : 'Update'}
				variant='primary'
			/>
		</form>
	);
}
