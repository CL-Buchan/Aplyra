'use client';

import { useEffect, useRef, type RefObject } from 'react';

export type CanvasSceneFrame = {
	ctx: CanvasRenderingContext2D;
	width: number;
	height: number;
	time: number;
	dt: number;
	dpr: number;
};

type Options = {
	draw: (frame: CanvasSceneFrame) => void;
	onResize?: (size: { width: number; height: number; dpr: number }) => void;
	maxDpr?: number;
	paused?: boolean;
};

export function useCanvasScene(
	canvasRef: RefObject<HTMLCanvasElement | null>,
	{ draw, onResize, maxDpr = 2, paused = false }: Options,
) {
	const drawRef = useRef(draw);
	const resizeRef = useRef(onResize);
	useEffect(() => {
		drawRef.current = draw;
		resizeRef.current = onResize;
	});

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const parent = canvas.parentElement ?? canvas;
		const reduceMotion = window.matchMedia(
			'(prefers-reduced-motion: reduce)',
		).matches;

		let width = 0;
		let height = 0;
		let dpr = 1;
		let raf = 0;
		let start = 0;
		let last = 0;
		let running = false;
		let visible = true;

		const renderOnce = (time: number) => {
			ctx.clearRect(0, 0, width, height);
			drawRef.current({ ctx, width, height, time, dt: 0, dpr });
		};

		const resize = () => {
			const rect = parent.getBoundingClientRect();
			width = Math.max(1, Math.round(rect.width));
			height = Math.max(1, Math.round(rect.height));
			dpr = Math.min(window.devicePixelRatio || 1, maxDpr);

			canvas.width = Math.round(width * dpr);
			canvas.height = Math.round(height * dpr);
			canvas.style.width = `${width}px`;
			canvas.style.height = `${height}px`;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

			resizeRef.current?.({ width, height, dpr });
			if (!running) renderOnce(last ? (last - start) / 1000 : 0);
		};

		const frame = (now: number) => {
			if (!running) return;
			if (!start) start = now;
			if (!last) last = now;
			const time = (now - start) / 1000;
			const dt = Math.min((now - last) / 1000, 0.05);
			last = now;
			ctx.clearRect(0, 0, width, height);
			drawRef.current({ ctx, width, height, time, dt, dpr });
			raf = requestAnimationFrame(frame);
		};

		const play = () => {
			if (running || reduceMotion || paused || !visible) return;
			running = true;
			last = 0;
			raf = requestAnimationFrame(frame);
		};

		const stop = () => {
			running = false;
			cancelAnimationFrame(raf);
		};

		const onVisibility = () => {
			if (document.hidden) stop();
			else play();
		};

		const io = new IntersectionObserver(
			([entry]) => {
				visible = entry.isIntersecting;
				if (visible) play();
				else stop();
			},
			{ threshold: 0 },
		);
		io.observe(parent);

		const ro = new ResizeObserver(resize);
		ro.observe(parent);

		document.addEventListener('visibilitychange', onVisibility);

		resize();
		if (reduceMotion || paused) renderOnce(0);
		else play();

		return () => {
			stop();
			io.disconnect();
			ro.disconnect();
			document.removeEventListener('visibilitychange', onVisibility);
		};
	}, [canvasRef, maxDpr, paused]);
}
