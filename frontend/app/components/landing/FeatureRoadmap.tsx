export default function FeatureRoadmap() {
	return (
		<div className='border-t border-white/[0.08] pt-9'>
			<div className='grid grid-cols-3 gap-1'>
				<div className='h-10 bg-brand-blue/[0.14] border border-brand-blue/30 rounded-l-[7px]' />
				<div className='h-10 bg-brand-blue/[0.22] border-y border-brand-blue/40' />
				<div className='h-10 bg-brand-blue/[0.32] border border-[#5C8FF7]/50 rounded-r-[7px]' />
			</div>
			<div className='grid grid-cols-1 sm:grid-cols-3 gap-2 mt-3.5'>
				<div className='flex items-center gap-1.5'>
					<span className='w-1.5 h-1.5 bg-[#8fb0f9] rotate-45 shrink-0' />
					<span className='text-xs text-[#888888]'>Job post in</span>
				</div>
				<div className='flex items-center gap-1.5'>
					<span className='w-1.5 h-1.5 bg-[#8fb0f9] rotate-45 shrink-0' />
					<span className='text-xs text-[#888888]'>
						Letter drafted
					</span>
				</div>
				<div className='flex items-center gap-1.5'>
					<span className='w-1.5 h-1.5 bg-[#8fb0f9] rotate-45 shrink-0' />
					<span className='text-xs text-[#888888]'>
						Tracked to offer
					</span>
				</div>
			</div>

			<div className='grid grid-cols-1 sm:grid-cols-3 gap-8 pt-10 mt-10 border-t border-white/[0.08]'>
				<div>
					<h4 className='text-base font-semibold text-white mb-2'>
						Drop in the job post
					</h4>
					<p className='text-sm text-[#888888] leading-relaxed'>
						Paste a listing or upload your resume. Aplyra reads the
						role and your background.
					</p>
				</div>
				<div>
					<h4 className='text-base font-semibold text-white mb-2'>
						Get a tailored letter
					</h4>
					<p className='text-sm text-[#888888] leading-relaxed'>
						A cover letter written for that specific company and
						role, ready to edit and export.
					</p>
				</div>
				<div>
					<h4 className='text-base font-semibold text-white mb-2'>
						Track it to the offer
					</h4>
					<p className='text-sm text-[#888888] leading-relaxed'>
						Every application lives in one board, with statuses,
						follow-ups and closing dates.
					</p>
				</div>
			</div>
		</div>
	);
}
