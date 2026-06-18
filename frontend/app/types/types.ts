export interface DropzoneProps {
	file: File | undefined;
	error: string;
	loading: boolean;
	size?: 'sm' | 'md' | 'lg';
	onFileSelect: (file: File | undefined) => void;
}
