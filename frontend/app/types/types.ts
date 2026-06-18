export interface DropzoneProps {
	file?: File;
	error?: string;
	loading?: boolean;
	onFileSelect: (file: File | undefined) => void;
}
