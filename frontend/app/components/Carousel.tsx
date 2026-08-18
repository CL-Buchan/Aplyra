'use client';

import Image from 'next/image';
import { CarouselProps } from '../types/global.types';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { ArrowNarrowLeft, ArrowNarrowRight } from '@untitledui/icons';

export default function Carousel({
	children,
	content,
	title,
	description,
	styles: { imageHeight = 300, imageWidth = 150 } = {},
	textPosition,
}: CarouselProps) {
	const [selectedIndex, setSelectedIndex] = useState(2);
	const [containerWidth, setContainerWidth] = useState(0);

	// Assign container width to compute remaining space to fill
	useEffect(() => {
		const container = document.getElementById('carousel_container');
		if (!container) return;

		// Watch for changes in container width/dimensions
		const observer = new ResizeObserver((entries) => {
			const width = entries[0].contentRect.width;
			const remainingWidth = (width ?? 0) - 24 * 2;
			setContainerWidth(remainingWidth);
		});

		observer.observe(container);

		return () => {
			observer.disconnect();
		};
	}, []);

	const elementWidth = containerWidth / 3;

	// Placeholder cards
	const placeholders = [1, 2, 3];

	return (
		<div className='w-full flex flex-col items-center gap-10'>
			{children && textPosition == 'top' ? (
				<div className='w-full flex flex-col justify-start items-start'>
					{children}
				</div>
			) : textPosition == 'top' ? (
				<div className='w-full flex flex-col justify-start items-start gap-2.5'>
					<h1 className='text-4xl'>{title || 'Title'}</h1>
					<p>{description || 'Description'}</p>
				</div>
			) : (
				<></>
			)}

			<div
				id='carousel_container'
				className='w-full flex flex-row justify-center items-center gap-2.5'>
				<ArrowNarrowLeft
					className='text-muted'
					style={{ minWidth: '24px' }}
				/>
				<div className='flex-1 flex flex-row items-center gap-5'>
					{content && content.length > 0
						? content.map(({ path, imgDesc }, index) => (
								<Image
									key={index}
									src={path}
									alt={`#${index}: ${imgDesc}`}
									height={imageHeight}
									width={elementWidth}
									onClick={() => setSelectedIndex(index)}
									style={{
										height: imageHeight,
										width: elementWidth,
									}}
									className={clsx(
										`object-cover overflow-hidden rounded-2xl transition-all duration-300 ease-in-out opacity-50 z-20`,
										selectedIndex === index
											? 'scale-110 opacity-100 shadow-2xl shadow-white'
											: '',
									)}
								/>
							))
						: placeholders.map((index) => (
								<div
									key={index}
									onClick={() => setSelectedIndex(index)}
									style={{
										height: imageHeight,
										width: elementWidth,
									}}
									className={clsx(
										'bg-gray-500 rounded-2xl transition-all duration-300 ease-in-out opacity-50 z-20',
										selectedIndex === index
											? 'scale-110 opacity-100 shadow shadow-white'
											: '',
									)}
								/>
							))}
				</div>
				<ArrowNarrowRight
					className='text-muted'
					style={{ minWidth: '24px' }}
				/>
			</div>

			{children && textPosition == 'bottom' ? (
				<div className='w-full flex flex-col justify-start items-start'>
					{children}
				</div>
			) : textPosition == 'bottom' ? (
				<div className='w-full flex flex-col justify-start items-start gap-2.5'>
					<h1 className='text-4xl'>{title || 'Title'}</h1>
					<p>{description || 'Description'}</p>
				</div>
			) : (
				<></>
			)}
		</div>
	);
}
