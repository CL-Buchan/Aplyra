import { SetStateAction } from 'react';

type frequentOpacityValues = '5%' | '10%' | '25%' | '50%' | '100%';
export type Content = { path: string; imgDesc: string };

// -- Prop types --
export interface CarouselProps {
	children?: React.ReactNode;
	content: Content[];
	title?: string;
	description?: string;
	styles?: { imageHeight?: number; imageWidth?: number };
}

export interface RadialGlowProps {
	height?: number;
	width?: number;
	positionX?: number;
	positionY?: number;
	className?: string;
	hexColour?: string;
}

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
	onSubmit: () => void;
	setFormData: React.Dispatch<SetStateAction<LoginFormData | SignupFormData>>;
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
	redirectTo?: string;
	text?: string;
	type?: 'button' | 'submit' | 'reset';
	children?: React.ReactNode;
	variant?: 'none' | 'primary' | 'secondary';
	className?: string;
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

// Data types
export interface LoginFormData {
	username: string;
	password: string;
}

export interface SignupFormData extends LoginFormData {
	name: string;
	acceptsPrivacyPolicy: boolean;
}
