import { ImageResponse } from 'next/og';
import { SITE_NAME, SITE_TAGLINE } from './config/site';

export const runtime = 'nodejs';

export const alt = `${SITE_NAME} — ${SITE_TAGLINE}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
	return new ImageResponse(
		(
			<div
				style={{
					width: '100%',
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					padding: '90px',
					background:
						'radial-gradient(ellipse at 50% 0%, #241a4d 0%, #000000 60%)',
					color: '#ffffff',
					fontFamily: 'sans-serif',
				}}>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: '18px',
						fontSize: '34px',
						fontWeight: 600,
						letterSpacing: '-0.02em',
					}}>
					<svg width='40' height='40' viewBox='0 0 24 24' fill='none'>
						<path
							d='M6 4 L18 12 L6 20 L6 13 L13 12 L6 11 Z'
							fill='#7C5CFC'
						/>
					</svg>
					{SITE_NAME}
				</div>

				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						marginTop: '48px',
						fontSize: '76px',
						fontWeight: 600,
						lineHeight: 1.12,
						letterSpacing: '-0.04em',
						maxWidth: '920px',
					}}>
					<span>Writing cover letters is a chore.</span>
					<span style={{ color: '#b9a8ff' }}>
						Aplyra writes them for you.
					</span>
				</div>

				<div
					style={{
						marginTop: '40px',
						fontSize: '30px',
						color: '#9a9a9a',
						letterSpacing: '-0.01em',
					}}>
					{SITE_TAGLINE}
				</div>
			</div>
		),
		{ ...size },
	);
}
