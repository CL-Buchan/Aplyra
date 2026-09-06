import { forwardRef, type CSSProperties } from 'react';
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
			hexColour = '#7C5CFC',
			opacity,
		},
		ref,
	) => {
		const translateY = positionY ? `translateY(${positionY})` : '';
		const translateX = positionX ? `translateX(${positionX})` : '';

		const style: CSSProperties = {
			width,
			height,
			transform: `${translateY} ${translateX}`.trim(),
			background: `radial-gradient(ellipse closest-side, ${hexColour}, transparent)`,
		};

		if (opacity !== undefined) {
			style.opacity = Number(opacity) / 100;
		}

		return (
			<div
				ref={ref}
				style={style}
				className={clsx(
					'absolute blur-3xl z-0 pointer-events-none',
					className ?? 'top-0 left-0',
				)}
			/>
		);
	},
);

RadialGlow.displayName = 'RadialGlow';
export default RadialGlow;
