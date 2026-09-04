import { getCurrentUser } from '@/app/services/auth/getCurrentUser';
import { redirect } from 'next/navigation';

export default async function Layout({
	children,
}: {
	children: React.ReactNode;
}) {
	// Check user is logged in - redirect safely if user is not signed in
	const user = await getCurrentUser();

	if (!user) return redirect('/auth/login');

	return <>{children}</>;
}
