export default function FeatureRoadmap() {
	return (
		<div className='border-t border-black/8 dark:border-white/8 pt-9'>
			<div className='grid grid-cols-3 gap-1'>
				<div className='h-10 bg-brand-purple/[0.14] border border-brand-purple/30 rounded-l-[7px]' />
				<div className='h-10 bg-brand-purple/32 border-y border-brand-purple/40' />
				<div className='h-10 bg-brand-purple/52 border border-[#5C8FF7]/50 rounded-r-[7px]' />
			</div>
			<div className='grid grid-cols-1 sm:grid-cols-3 gap-2 mt-3.5'>
				<div className='flex items-center gap-1.5'>
					<span className='w-1.5 h-1.5 bg-[#8fb0f9] rotate-45 shrink-0' />
					<span className='text-xs text-muted'>Job post in</span>
				</div>
				<div className='flex items-center gap-1.5'>
					<span className='w-1.5 h-1.5 bg-[#85aafb] rotate-45 shrink-0' />
					<span className='text-xs text-muted'>
						Letter drafted
					</span>
				</div>
				<div className='flex items-center gap-1.5'>
					<span className='w-1.5 h-1.5 bg-[#78a0f6] rotate-45 shrink-0' />
					<span className='text-xs text-muted'>
						Tracked to offer
					</span>
				</div>
			</div>

			<div className='relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-10 mt-10 border-t border-black/8 dark:border-white/8'>
				<div className='py-10 px-5 border border-surface/15 dark:border-white/15 rounded-[9px] bg-[#DADADA]/5 backdrop-blur-3xl hover:scale-105 transition-all duration-200 ease-in-out hover:opacity-100 opacity-70'>
					<p className='font-mono mb-5'>01</p>
					<h4 className='text-base font-semibold text-black dark:text-white mb-2'>
						Drop in the job post
					</h4>
					<p className='text-sm text-muted leading-relaxed'>
						Paste a listing or upload your resume. Aplyra reads the
						role and your background.
					</p>
				</div>
				<div className='py-10 px-5 border border-surface/15 dark:border-white/15 rounded-[9px] bg-[#DADADA]/5 backdrop-blur-3xl hover:scale-105 transition-all duration-200 ease-in-out hover:opacity-100 opacity-70'>
					<p className='font-mono mb-5'>02</p>
					<h4 className='text-base font-semibold text-black dark:text-white mb-2'>
						Get a tailored letter
					</h4>
					<p className='text-sm text-muted leading-relaxed'>
						A cover letter written for that specific company and
						role, ready to edit and export.
					</p>
				</div>
				<div className='py-10 px-5 border border-surface/15 dark:border-white/15 rounded-[9px] bg-[#DADADA]/5 backdrop-blur-3xl hover:scale-105 transition-all duration-200 ease-in-out hover:opacity-100 opacity-70'>
					<p className='font-mono mb-5'>03</p>
					<h4 className='text-base font-semibold text-black dark:text-white mb-2'>
						Track it to the offer
					</h4>
					<p className='text-sm text-muted leading-relaxed'>
						Every application lives in one board, with statuses,
						follow-ups and closing dates.
					</p>
				</div>
			</div>
		</div>
	);
}
