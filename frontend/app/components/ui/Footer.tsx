import { Mark } from './Mark';
import PulseGrid from './PulseGrid';

export default function Footer() {
	return (
		<footer className='relative flex w-full min-h-25 items-center overflow-hidden border-t border-black/[0.07] dark:border-white/[0.07] px-6 md:px-20 py-6'>
			<PulseGrid
				filled
				gap={26}
				dotRadius={1}
				speed={2}
				className='text-black/15 dark:text-white/20 mask-[linear-gradient(to_bottom,transparent,black_55%)]'
			/>

			<div className='relative z-10 flex w-full items-center justify-between'>
				<span className='text-xs text-[#595959]'>© 2026 Aplyra</span>
				<Mark size={16} className='opacity-60' />
			</div>
		</footer>
	);
}
