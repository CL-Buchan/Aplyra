import RadialGlow from '@/app/components/ui/RadialGlow';
import Sidebar from '@/app/components/ui/Sidebar';
import { ProfileProvider } from '@/app/components/profile/ProfileContext';
import { getCurrentUser } from '@/app/services/auth/getCurrentUser';
import { getProfileSummary } from '@/app/services/profile/getProfileSummary';
import { redirect } from 'next/navigation';

export default async function Layout({
	children,
}: {
	children: React.ReactNode;
}) {
	const user = await getCurrentUser();
	if (!user) return redirect('/auth/login');

	const initialUser = { id: user.id, email: user.email ?? '' };
	const { name, profileImageUrl } = await getProfileSummary(user.id);

	return (
		<ProfileProvider profileImageUrl={profileImageUrl} displayName={name}>
			<div className='relative w-full flex flex-row overflow-hidden bg-black'>
				<Sidebar initialUser={initialUser} />
				<div className={'w-full h-screen overflow-hidden'}>{children}</div>

				{/* Background glow for dashboard */}
				<RadialGlow
					hexColour='#6366f1'
					opacity={25}
					width={'120%'}
					height={600}
					className='blur-[160px]! -bottom-64 left-1/2 -translate-x-1/2 rounded-[100%]'
				/>
				<RadialGlow
					hexColour='#6366f1'
					opacity={5}
					width={'60%'}
					height={400}
					className='blur-[120px]! -top-48 left-1/4'
				/>
			</div>
		</ProfileProvider>
	);
}
