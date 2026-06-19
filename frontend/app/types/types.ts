export interface DropzoneProps {
	file: File | undefined;
	error: string;
	loading: boolean;
	size?: 'sm' | 'md' | 'lg';
	onFileSelect: (file: File | undefined) => void;
}

export interface ButtonProps {
	children?: React.ReactNode;
	variant?: 'none' | 'primary' | 'secondary';
	onClick?: () => void;
}
