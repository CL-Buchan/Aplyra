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
