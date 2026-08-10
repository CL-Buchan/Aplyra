import { Mark } from './Mark';

export default function Footer() {
	return (
		<footer className='w-full border-t border-black/[0.07] dark:border-white/[0.07] px-6 md:px-20 py-6 flex items-center justify-between'>
			<span className='text-xs text-[#595959]'>© 2026 Aplyra</span>
			<Mark size={16} className='opacity-60' />
		</footer>
	);
}
