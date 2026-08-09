import RadialGlow from '../ui/RadialGlow';

export default function DashboardPreview() {
	return (
		<div className='relative w-full'>
			<RadialGlow
				width={1030}
				height={100}
				className='top-15 left-1/2 -translate-x-1/2 opacity-35 pointer-events-none'
			/>

			<div
				aria-hidden
				className='relative z-10 mt-14 w-full max-w-5xl [mask-image:linear-gradient(to_bottom,black_40%,transparent_90%)] [-webkit-mask-image:linear-gradient(to_bottom,black_40%,transparent_90%)]'>
				<div className='mx-auto w-full max-w-4xl bg-surface border border-border rounded-t-2xl shadow-2xl overflow-hidden [transform:perspective(2000px)_rotateX(30deg)] [transform-origin:top_center]'>
					<div className='flex items-center gap-2 px-5 py-3 border-b border-white/[0.07]'>
						<span className='w-2 h-2 rounded-full bg-[#F87171]' />
						<span className='w-2 h-2 rounded-full bg-[#E8B93F]' />
						<span className='w-2 h-2 rounded-full bg-[#63B37E]' />
						<span className='ml-1.5 font-mono text-[11px] text-[#595959]'>
							app.aplyra.com/dashboard
						</span>
					</div>
					<div className='grid grid-cols-3 gap-4 p-7'>
						<div className='bg-[#151515] border border-white/[0.07] rounded-[10px] p-5'>
							<p className='text-[11px] text-[#888888] mb-2'>
								Applications
							</p>
							<p className='text-2xl font-semibold text-white'>
								14
							</p>
						</div>
						<div className='bg-[#151515] border border-white/[0.07] rounded-[10px] p-5'>
							<p className='text-[11px] text-[#888888] mb-2'>
								Interviews
							</p>
							<p className='text-2xl font-semibold text-[#5C8FF7]'>
								3
							</p>
						</div>
						<div className='bg-[#151515] border border-white/[0.07] rounded-[10px] p-5'>
							<p className='text-[11px] text-[#888888] mb-2'>
								Offers
							</p>
							<p className='text-2xl font-semibold text-[#A78BFA]'>
								1
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
