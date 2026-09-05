'use client';

import {
	updateUserProfile,
	uploadProfileImage,
} from '@/app/(pages)/dashboard/user/profile/actions';
import { ProfileEditformProps } from '@/app/types/global.types';
import Button from '@/app/components/ui/Button';
import { createClient } from '@/app/services/supabase/client';
import { useRouter } from 'next/navigation';
import { FormEvent, useMemo, useState, useTransition } from 'react';
import { toast } from 'sonner';
import posthog from 'posthog-js';
import Dropzone from '../Dropzone';

const PROFILE_IMAGE_BUCKET = 'profile_images';

export default function ProfileEditForm({ user }: ProfileEditformProps) {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const [imagePath, setImagePath] = useState(user.profile_image ?? '');
	const [uploadingImage, setUploadingImage] = useState(false);
	const [imageError, setImageError] = useState('');
	const [formData, setFormData] = useState({
		name: user.name ?? '',
		email: user.email ?? '',
	});

	const supabase = useMemo(() => createClient(), []);
	const imageUrl = useMemo(() => {
		if (!imagePath) return undefined;
		return supabase.storage.from(PROFILE_IMAGE_BUCKET).getPublicUrl(imagePath)
			.data.publicUrl;
	}, [imagePath, supabase]);

	const handleImageSelect = async (file: File | undefined) => {
		if (!file) return;

		setImageError('');
		setUploadingImage(true);

		const fileFormData = new FormData();
		fileFormData.append('file', file);

		const result = await uploadProfileImage(fileFormData);

		if (result.success && result.path) {
			setImagePath(result.path);
			posthog.capture('profile_image_updated');
			toast.success('Profile picture updated');
		} else {
			setImageError(result.error ?? 'Failed to upload image');
			toast.error(result.error ?? 'Failed to upload image');
		}

		setUploadingImage(false);
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		startTransition(async () => {
			const result = await updateUserProfile({
				name: formData.name,
				email: formData.email,
			});

			if (result.success) {
				posthog.capture('profile_updated');
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
			<label className='w-full flex flex-col items-center gap-2 text-sm'>
				<span className='self-start'>Profile picture:</span>
				{imageUrl ? (
					<label className='relative size-24 cursor-pointer rounded-full'>
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							src={imageUrl}
							alt='Profile'
							className='size-24 rounded-full object-cover border border-black/10 dark:border-white/15'
						/>
						{uploadingImage && (
							<div className='absolute inset-0 flex items-center justify-center rounded-full bg-black/50 text-xs text-white'>
								Uploading…
							</div>
						)}
						<input
							type='file'
							accept='image/*'
							className='hidden'
							onChange={(event) =>
								handleImageSelect(event.target.files?.[0])
							}
						/>
					</label>
				) : (
					<Dropzone
						file={undefined}
						error={imageError}
						success={false}
						loading={uploadingImage}
						disabled={uploadingImage}
						accept='image/*'
						label='No picture chosen, select an image'
						onFileSelect={handleImageSelect}
					/>
				)}
			</label>

			<label className='w-full flex flex-col gap-2 text-sm'>
				<span>Username:</span>
				<input
					type='text'
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
					type='text'
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

			<div className='flex flex-row gap-2.5'>
				<Button
					type='submit'
					text={isPending ? 'Saving…' : 'Update'}
					variant='primary'
				/>
			</div>
		</form>
	);
}
