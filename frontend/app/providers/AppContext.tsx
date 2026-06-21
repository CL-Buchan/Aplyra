import { createContext, useContext, useState } from 'react';
import { AppContextProviderProps } from '../types/types';

const AppContext = createContext<AppContextProviderProps | null>(null);

function AppContextProvider({ children }: { children: React.ReactNode }) {
	const [state, setState] = useState<string[]>([]);

	return (
		<AppContext.Provider value={{ state, setState }}>
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
