export default function ApplicationBoardPreview() {
	return (
		<div className='relative w-full [mask-image:linear-gradient(to_bottom,black_35%,transparent_80%)] [-webkit-mask-image:linear-gradient(to_bottom,black_35%,transparent_80%)]'>
			<div className='bg-[#101010] border border-border rounded-xl overflow-hidden shadow-2xl'>
				<div className='flex items-center gap-2 px-5 py-3.5 border-b border-white/[0.07]'>
					<span className='w-2.5 h-2.5 rounded-full bg-[#F87171]' />
					<span className='w-2.5 h-2.5 rounded-full bg-[#E8B93F]' />
					<span className='w-2.5 h-2.5 rounded-full bg-[#63B37E]' />
					<span className='ml-2 font-mono text-xs text-[#595959]'>
						app.aplyra.com/applications
					</span>
				</div>
				<div className='flex flex-col md:flex-row'>
					<div className='flex-1 p-6 flex flex-col gap-2.5 border-b md:border-b-0 md:border-r border-white/[0.07]'>
						<p className='text-[11px] font-medium text-[#595959] uppercase tracking-wide mb-1'>
							Applications
						</p>
						<div className='flex justify-between items-center bg-brand-purple/[0.08] border border-[#5C8FF7]/40 rounded-lg py-3.5 px-4'>
							<div>
								<p className='text-[13px] font-medium text-white'>
									Senior Product Designer
								</p>
								<p className='text-xs text-[#888888] mt-0.5'>
									Northwind Labs
								</p>
							</div>
							<span className='flex items-center gap-1.5 text-xs text-[#5C8FF7]'>
								<span className='w-1.75 h-1.75 rounded-full bg-[#5C8FF7]' />
								Interview
							</span>
						</div>
						<div className='flex justify-between items-center bg-[#151515] border border-white/[0.07] rounded-lg py-3.5 px-4'>
							<div>
								<p className='text-[13px] font-medium text-white'>
									Growth Marketing Lead
								</p>
								<p className='text-xs text-[#888888] mt-0.5'>
									Fernwood
								</p>
							</div>
							<span className='flex items-center gap-1.5 text-xs text-[#63B37E]'>
								<span className='w-1.75 h-1.75 rounded-full bg-[#63B37E]' />
								Applied
							</span>
						</div>
						<div className='flex justify-between items-center bg-[#151515] border border-white/[0.07] rounded-lg py-3.5 px-4'>
							<div>
								<p className='text-[13px] font-medium text-white'>
									Staff Engineer
								</p>
								<p className='text-xs text-[#888888] mt-0.5'>
									Loom &amp; Co
								</p>
							</div>
							<span className='flex items-center gap-1.5 text-xs text-[#A78BFA]'>
								<span className='w-1.75 h-1.75 rounded-full bg-[#A78BFA]' />
								Offer
							</span>
						</div>
					</div>
					<div className='flex-1 p-6 bg-gradient-to-b from-brand-purplelue/5 to-transparent'>
						<div className='flex items-center gap-2 mb-1'>
							<span className='w-1.5 h-1.5 rounded-full bg-[#5C8FF7] shadow-[0_0_8px_#5C8FF7]' />
							<p className='text-[13px] font-medium text-white'>
								Cover letter — Northwind Labs
							</p>
						</div>
						<p className='text-xs text-[#595959] mb-4'>
							Generated in 4 seconds, tailored to the listing
						</p>
						<div className='bg-[#0A0A0A] border border-white/[0.08] rounded-lg p-1.5'>
							<div className='bg-[#EDEBE7] rounded flex flex-col gap-1.75 p-5 h-32 overflow-hidden'>
								<div className='h-1.75 w-2/5 bg-black/28 rounded-sm mb-1.5' />
								<div className='h-1.5 w-[96%] bg-black/14 rounded-sm' />
								<div className='h-1.5 w-[90%] bg-black/14 rounded-sm' />
								<div className='h-1.5 w-[92%] bg-black/14 rounded-sm' />
								<div className='h-1.5 w-[70%] bg-black/14 rounded-sm' />
							</div>
						</div>
						<button
							type='button'
							tabIndex={-1}
							className='mt-7 bg-brand-purple text-white rounded-[7px] px-4 h-8 text-xs font-semibold'>
							Export PDF
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
