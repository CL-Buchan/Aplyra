import { IndicatorCircleProps } from '@/app/types/global.types';

export default function IndicatorCircle({
	colour,
	height = 5,
	width = 5,
}: IndicatorCircleProps) {
	let circleColour = '';

	switch (colour) {
		case 'green':
			circleColour = '#63B37E';
			break;
		case 'red':
			circleColour = '#F87171';
			break;
		case 'blue':
			circleColour = '#5C8FF7';
			break;
		case 'grey':
			circleColour = '#4e4e4e';
			break;
		default:
			break;
	}
	return (
		<svg
			width={width}
			height={height}
			viewBox='0 0 10 10'
			xmlns='http://www.w3.org/2000/svg'>
			<circle cx='5' cy='5' r='5' fill={circleColour} />
		</svg>
	);
}
