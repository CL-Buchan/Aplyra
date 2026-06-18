export default function Button({
	text = 'Add Text',
	children,
	variant = 'primary',
}: {
	text?: string;
	children?: React.ReactNode;
	variant?: 'primary' | 'secondary';
}) {
	let style = '';
	switch (variant) {
		case 'primary':
			style = 'bg-black/5 dark:bg-white/10';
			break;
		case 'secondary':
			style = 'bg-black text-white dark:bg-white dark:text-black';
			break;
		default:
			break;
	}

	return (
		<button className={`py-1.25 px-10 rounded-2xl tracking-tight ${style}`}>
			{children ?? text}
		</button>
	);
}
