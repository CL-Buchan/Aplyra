import { BreadcrumbProps } from '@/app/types/global.types';
import { ChevronRight } from '@untitledui/icons';
import Link from 'next/link';

export default function Breadcrumb({ items }: BreadcrumbProps) {
	return (
		<nav aria-label='Breadcrumb' className='flex items-center gap-1.5 text-sm text-muted'>
			{items.map((item, index) => {
				const isLast = index === items.length - 1;

				return (
					<span key={`${item.label}-${index}`} className='flex items-center gap-1.5'>
						{index > 0 && (
							<ChevronRight
								width={14}
								height={14}
								className='shrink-0 opacity-40'
							/>
						)}
						{item.href && !isLast ? (
							<Link
								href={item.href}
								className='transition-colors duration-300 ease-in-out hover:text-white'>
								{item.label}
							</Link>
						) : (
							<span className={isLast ? 'text-white' : undefined}>
								{item.label}
							</span>
						)}
					</span>
				);
			})}
		</nav>
	);
}
