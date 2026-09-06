import { FAQ_ITEMS } from './faqData';
import { Badge } from '../ui/Badge';

export default function Faq() {
	return (
		<section
			id='faq'
			className='w-full flex flex-col items-center'>
			<Badge indicator={false} bgColour='grey' className='mb-7'>
				FAQ
			</Badge>

			<h2 className='text-3xl! md:text-5xl! leading-[1.05]! font-semibold tracking-tighter text-black dark:text-white text-center mb-12'>
				Questions, answered.
			</h2>

			<dl className='w-full max-w-2xl flex flex-col divide-y divide-black/[0.08] dark:divide-white/[0.08] border-y border-black/[0.08] dark:border-white/[0.08]'>
				{FAQ_ITEMS.map(({ question, answer }) => (
					<div key={question}>
						<details className='group py-5'>
							<summary className='flex items-center justify-between gap-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden'>
								<dt className='text-base font-medium text-black dark:text-white'>
									{question}
								</dt>
								<span
									aria-hidden
									className='shrink-0 text-muted transition-transform duration-200 group-open:rotate-45'>
									+
								</span>
							</summary>
							<dd className='mt-3 pr-8 text-sm text-muted leading-relaxed'>
								{answer}
							</dd>
						</details>
					</div>
				))}
			</dl>
		</section>
	);
}
