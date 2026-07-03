import { IndicatorProps } from '../types/types';
import IndicatorCircle from './ui/IndicatorCircle';

export default function Indicator({ colour = 'red' }: IndicatorProps) {
	let text = '';
	switch (colour) {
		case 'red':
			text = 'Not ready to save';
			break;
		case 'grey':
			text = 'Ready to save';
			break;
		case 'blue':
			text = 'Saving...';
			break;
		case 'green':
			text = 'Successfully saved';
			break;
		default:
			break;
	}
	return (
		<div className='flex items-center gap-[8px]'>
			<IndicatorCircle colour={colour} />
			<p className='text-[#888888]'>{text}</p>
		</div>
	);
}
