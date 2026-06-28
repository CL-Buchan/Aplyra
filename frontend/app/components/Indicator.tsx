import IndicatorCircle from './ui/IndicatorCircle';

export default function Indicator() {
	return (
		<div className='flex items-center gap-[8px]'>
			<IndicatorCircle colour='green' />
			<p className='text-[#888888]'>Ready to save</p>
		</div>
	);
}
