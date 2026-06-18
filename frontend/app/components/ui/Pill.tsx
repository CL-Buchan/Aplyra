export default function Pill({
	text = 'Default',
	variant = 'primary',
}: {
	text: string;
	variant?: 'primary' | 'secondary';
}) {
	let style = '';
	switch (variant) {
		case 'primary':
			style =
				'bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/20';
			break;
		case 'secondary':
			style = 'bg-black text-white dark:bg-white dark:text-black';
			break;
		default:
			break;
	}

	return (
		<div
			className={`py-px px-5 rounded-xl uppercase tracking-tight ${style}`}>
			{text}
		</div>
	);
}
