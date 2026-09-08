'use client';

import { useRef, type CSSProperties } from 'react';
import clsx from 'clsx';
import { useCanvasScene } from '@/app/hooks/useCanvasScene';

type PulseGridProps = {
	className?: string;
	style?: CSSProperties;
	gap?: number;
	dotRadius?: number;
	filled?: boolean;
	speed?: number;
	angle?: number;
	density?: number;
	minAlpha?: number;
	maxAlpha?: number;
};

export default function PulseGrid({
	className,
	style,
	gap = 24,
	dotRadius = 1.4,
	filled = false,
	speed = 1.1,
	angle = 0.5,
	density = 0.3,
	minAlpha = 0.15,
	maxAlpha = 1,
}: PulseGridProps) {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const meta = useRef({ color: 'rgba(0,0,0,1)' });

	useCanvasScene(canvasRef, {
		onResize: () => {
			const el = canvasRef.current;
			if (el) meta.current.color = getComputedStyle(el).color || 'rgba(0,0,0,1)';
		},
		draw: ({ ctx, width, height, time }) => {
			const cols = Math.ceil(width / gap) + 1;
			const rows = Math.ceil(height / gap) + 1;
			const dx = Math.cos(angle);
			const dy = Math.sin(angle);
			const span = maxAlpha - minAlpha;

			ctx.fillStyle = meta.current.color;
			ctx.strokeStyle = meta.current.color;
			ctx.lineWidth = 1;

			for (let r = 0; r < rows; r++) {
				for (let c = 0; c < cols; c++) {
					const wave =
						0.5 +
						0.5 *
							Math.sin(time * speed + (c * dx + r * dy) * density);
					ctx.globalAlpha = minAlpha + wave * span;
					ctx.beginPath();
					ctx.arc(c * gap, r * gap, dotRadius, 0, Math.PI * 2);
					if (filled) ctx.fill();
					else ctx.stroke();
				}
			}
			ctx.globalAlpha = 1;
		},
	});

	return (
		<canvas
			ref={canvasRef}
			aria-hidden
			className={clsx(
				'pointer-events-none absolute inset-0 block h-full w-full text-black/10 dark:text-white/10',
				className,
			)}
			style={style}
		/>
	);
}
