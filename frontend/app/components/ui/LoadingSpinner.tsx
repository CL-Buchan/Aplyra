import { LoadingSpinnerProps } from '@/app/types/global.types';

export default function LoadingSpinner({
	colour,
	cy = '50%',
	cx = '50%',
	r = 10,
}: LoadingSpinnerProps) {
	const circleColour = colour ? colour : 'currentColor';
	return (
		<svg className='spinner' width={25} height={25}>
			<circle
				cx={cx}
				cy={cy}
				r={r}
				style={{ stroke: circleColour }}
				className='circle'
			/>
		</svg>
	);
}
