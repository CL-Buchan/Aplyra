export function Mark({
	size = 24,
	className,
}: {
	size?: number;
	className?: string;
}) {
	return (
		<svg
			width={size}
			height={size}
			viewBox='0 0 24 24'
			fill='none'
			className={className}>
			<path d='M6 4 L18 12 L6 20 L6 13 L13 12 L6 11 Z' fill='#7C5CFC' />
		</svg>
	);
}
