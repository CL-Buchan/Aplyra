import Image from 'next/image';
import { CarouselProps } from '../types/types';
import clsx from 'clsx';
import { useState } from 'react';
import {
	ArrowLeft,
	ArrowNarrowLeft,
	ArrowNarrowRight,
	ArrowRight,
} from '@untitledui/icons';

export default function Carousel({
	children,
	content,
	title,
	description,
	styles: { imageHeight = 0, imageWidth = 0 } = {},
}: CarouselProps) {
	const [selectedIndex, setSelectedIndex] = useState(0);

	// Placeholder cards
	const placeholders = [1, 2, 3];

	return (
		<div className='w-full'>
			<div className='flex flex-row items-center gap-5'>
				<ArrowNarrowLeft color='white' />
				<div className='flex flex-row items-center gap-5'>
					{content
						? content.map(({ path, imgDesc }, index) => (
								<Image
									key={index}
									src={path}
									alt={`#${index}: ${imgDesc}`}
									height={imageHeight}
									width={imageWidth}
									className={clsx('')}
								/>
							))
						: placeholders.map((index) => (
								<div
									key={index}
									style={{
										height: imageHeight,
										width: imageWidth,
									}}
									className={clsx(
										'bg-gray-500',
										selectedIndex === index ? '' : '',
									)}
								/>
							))}
				</div>
				<ArrowNarrowRight color='white' />
			</div>

			{children ?? (
				<div>
					<h1 className='text-4xl'>{title || 'Title'}</h1>
					<p>{description || 'Description'}</p>
				</div>
			)}
		</div>
	);
}
