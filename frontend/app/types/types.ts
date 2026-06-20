type frequentOpacityValues = '5%' | '10%' | '25%' | '50%' | '100%';

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
	children?: React.ReactNode;
	variant?: 'none' | 'primary' | 'secondary';
	onClick?: () => void;
}

export interface BackButtonNavProps {
	route?: string;
	children: React.ReactNode;
}

export interface CardProps {
	size?: 'sm' | 'md' | 'lg';
	title?: string;
	description?: string;
	children?: React.ReactNode;
	hexColour?: string;
	opacity?: frequentOpacityValues;
}

export interface PillProps {
	text: string;
	variant?: 'primary' | 'secondary';
	hexColour?: string;
	opacity?: frequentOpacityValues;
}
