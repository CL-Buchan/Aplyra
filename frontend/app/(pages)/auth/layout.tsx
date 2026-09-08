import RadialGlow from '@/app/components/ui/RadialGlow';

type LayoutProps = { children: React.ReactNode };

export default function Layout({ children }: LayoutProps) {
	return (
		<div className='relative w-full'>
			{/* Glow layer — pinned to the page box and clips its own overflow,
			    so the glows can never add scrollable height to the page */}
			<div className='pointer-events-none absolute inset-0 overflow-hidden'>
				<RadialGlow
					width={600}
					height={600}
					hexColour='#3C0061'
					className='-top-48 -left-48 opacity-20 dark:opacity-30'
				/>
				<RadialGlow
					width={560}
					height={560}
					hexColour='#B069DB'
					className='-bottom-40 -right-40 opacity-[0.18] dark:opacity-30'
				/>
			</div>

			<div className='relative z-10'>{children}</div>
		</div>
	);
}
