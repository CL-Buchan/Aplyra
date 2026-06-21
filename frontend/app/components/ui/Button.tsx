import { ButtonProps } from '@/app/types/types';

export default function Button({
	type = 'button',
	children,
	variant = 'primary',
	onClick,
}: ButtonProps) {
	let style = '';
	switch (variant) {
		case 'none':
			style = '';
			break;
		case 'primary':
			style =
				'bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20';
			break;
		case 'secondary':
			style =
				'bg-black hover:bg-black/80 text-white dark:bg-white hover:bg-white/80 dark:text-black ';
			break;
		default:
			break;
	}

	return (
		<button
			type={type}
			onClick={onClick}
			className={`w-full py-1.25 px-10 rounded-2xl tracking-tight transition-colors duration-300 ease-in-out ${style}`}>
			{children ?? 'Add Text'}
		</button>
	);
}
