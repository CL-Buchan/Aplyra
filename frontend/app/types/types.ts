import { SetStateAction } from 'react';

type frequentOpacityValues = '5%' | '10%' | '25%' | '50%' | '100%';

// -- Prop types --
export interface FormProps {
	title?: string;
	description?: string;
	inputs: {
		type: string;
		label: string;
		name: string;
		placeholder: string;
	}[];
	styles?: { borderHexColour?: string; backgroundHexColour?: string };
	bttnText?: string;
}

export interface DropzoneProps {
	file: File | undefined;
	error: string;
	success: boolean;
	loading: boolean;
	size?: 'sm' | 'md' | 'lg';
	disabled: boolean;
	onFileSelect: (file: File | undefined) => void;
}

export interface ButtonProps {
	type?: 'button' | 'submit' | 'reset';
	children?: React.ReactNode;
	variant?: 'none' | 'primary' | 'secondary';
	onClick?: () => void;
}

export interface BackButtonNavProps {
	route?: string;
}

export interface CardProps {
	size?: 'sm' | 'md' | 'lg';
	title?: string;
	description?: string;
	children?: React.ReactNode;
	styles?: { hexColour?: string; opacity?: frequentOpacityValues };
}

export interface PillProps {
	text: string;
	variant?: 'primary' | 'secondary';
	styles?: { hexColour?: string; opacity?: frequentOpacityValues };
}

// Providers

export interface AppContextProviderProps {
	state: string[];
	setState: React.Dispatch<SetStateAction<string[]>>;
}
