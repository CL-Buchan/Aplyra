import { SetStateAction } from 'react';

type frequentOpacityValues = '5%' | '10%' | '25%' | '50%' | '100%';
export type Content = { path: string; imgDesc: string };

// -- Prop types --
export interface InputProps {
	type: 'date' | 'text' | 'textarea';
	placeholder?: string;
	className?: string;
}

export interface IndicatorCircleProps {
	colour: 'green' | 'purple' | 'red' | 'blue';
	height?: number;
	width?: number;
}

export interface ModalProps {
	header?: { title?: string; description?: string };
	body?: { children?: React.ReactNode };
	footer?: { buttons?: { text: string }[]; children?: React.ReactNode };
	children?: React.ReactNode;
	onClose: () => void;
	isOpen: boolean;
}

export interface CarouselProps {
	children?: React.ReactNode;
	content: Content[];
	title?: string;
	description?: string;
	styles?: { imageHeight?: number; imageWidth?: number };
	textPosition?: 'top' | 'bottom';
}

export interface RadialGlowProps {
	height?: number;
	width?: number;
	positionX?: number;
	positionY?: number;
	className?: string;
	hexColour?: string;
}

export interface FormProps<T> {
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
	setFormData: React.Dispatch<SetStateAction<T>>;
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
	userLoggedIn: boolean;
	setUserLoggedIn: React.Dispatch<SetStateAction<boolean>>;
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
