import { createClient } from '@/app/services/supabase/server';
import { redirect } from 'next/navigation';

export default async function Layout({
	children,
}: {
	children: React.ReactNode;
}) {
	// Check user is logged in - redirect safely if user is not signed in
	const supabase = await createClient();
	const user = await supabase.auth.getUser();

	if (!user.data.user) return redirect('/auth/login');

	return <>{children}</>;
}
