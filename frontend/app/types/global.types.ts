import { StaticImageData } from 'next/image';
import { ChangeEvent, SetStateAction } from 'react';
import { Tables } from './database.types';

type frequentOpacityValues = '5%' | '10%' | '25%' | '50%' | '100%';

export type Content = { path: string | StaticImageData; imgDesc: string };

// -- Prop types --
export interface ProfileEditformProps {
	user: Tables<'users'>;
	setUser: React.Dispatch<SetStateAction<Tables<'users'>>>;
}

export interface LoadingSpinnerProps {
	colour?: string;
	cy?: number | string;
	cx?: number | string;
	r?: number;
}

export interface JobApplication {
	role?: string;
	company?: string;
	location?: string;
	status?: string;
	appliedDate?: string | Date;
	closingDate?: string | Date;
	jobDescription?: string;
}

export interface InputProps {
	type: 'date' | 'text' | 'email' | 'textarea';
	name?: string;
	placeholder?: string;
	className?: string;
	value?: string;
	onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

type IndicatorColours = 'green' | 'grey' | 'red' | 'blue';

export interface IndicatorCircleProps {
	colour?: IndicatorColours;
	height?: number;
	width?: number;
}

export interface IndicatorProps {
	colour?: IndicatorColours;
}

export interface Modal {
	onClose: () => void;
	isOpen: boolean;
}

export interface ModalProps extends Modal {
	header?: { title?: string; description?: string };
	body?: { children?: React.ReactNode };
	footer?: {
		element?: React.ReactNode;
		buttons?: { text: string; onClick?: () => void; disabled?: boolean }[];
		children?: React.ReactNode;
	};
	children?: React.ReactNode;
	isInputsFilled?: boolean;
	isLoading?: boolean;
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
	formData: T;
	setFormData: React.Dispatch<SetStateAction<T>>;
	isLoading: boolean;
	isError?: boolean;
	errorMsg?: string;
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
	disabled?: boolean;
	isLoading?: boolean;
}

export interface BackButtonNavProps {
	route?: string;
}

export interface NavProps {
	initialUser: { email: string } | null;
}

export interface SidebarProps {
	initialUser: { email: string } | null;
}

export interface BreadcrumbItem {
	label: string;
	href?: string;
}

export interface BreadcrumbProps {
	items: BreadcrumbItem[];
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

export interface LetterRequest {
	job_description: string;
	cv_text: string;
}

export interface LetterResponse {
	letter: string;
}
