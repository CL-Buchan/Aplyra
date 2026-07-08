import { createContext, useContext, useState } from 'react';
import { AppContextProviderProps } from '../types/global.types';

const AppContext = createContext<AppContextProviderProps | null>(null);

function AppContextProvider({ children }: { children: React.ReactNode }) {
	const [userLoggedIn, setUserLoggedIn] = useState(false);

	return (
		<AppContext.Provider value={{ userLoggedIn, setUserLoggedIn }}>
			{children}
		</AppContext.Provider>
	);
}

const useAppContext = () => {
	const context = useContext(AppContext);

	if (!context) {
		throw new Error(
			'useAppContext must be used within a AppContextProvider',
		);
	}
	return context;
};

export { AppContextProvider, useAppContext };
