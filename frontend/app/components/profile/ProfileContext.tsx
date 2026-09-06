'use client';

import { createContext, useContext, type ReactNode } from 'react';

interface ProfileContextValue {
	profileImageUrl: string | null;
	displayName: string | null;
}

const ProfileContext = createContext<ProfileContextValue>({
	profileImageUrl: null,
	displayName: null,
});

export function ProfileProvider({
	profileImageUrl,
	displayName,
	children,
}: ProfileContextValue & { children: ReactNode }) {
	return (
		<ProfileContext.Provider value={{ profileImageUrl, displayName }}>
			{children}
		</ProfileContext.Provider>
	);
}

export function useProfileContext() {
	return useContext(ProfileContext);
}
