import { forwardRef } from 'react';
import { RadialGlowProps } from '@/app/types/global.types';
import clsx from 'clsx';

const RadialGlow = forwardRef<HTMLDivElement, RadialGlowProps>(
	(
		{
			width = 500,
			height = 500,
			positionX,
			positionY,
			className,
			hexColour = '#0000FF',
		},
		ref,
	) => {
		const translateY = positionY ? `translateY(${positionY})` : '';
		const translateX = positionX ? `translateX(${positionX})` : '';

		return (
			<div
				ref={ref}
				style={{
					width,
					height,
					transform: `${translateY} ${translateX}`.trim(),
					background: `radial-gradient(${hexColour}, transparent)`,
				}}
				className={clsx(
					'absolute blur-3xl z-0',
					className ?? 'top-0 left-0',
				)}
			/>
		);
	},
);

RadialGlow.displayName = 'RadialGlow';
export default RadialGlow;
