import Link from 'next/link';

export default function Nav() {
	const links = [{ text: '', route: '' }];

	return (
		<>
			<div className=''>
				<nav className=''>
					<ul className=''>
						{links.map(({ text, route }, index) => (
							<li key={index}>
								<Link href={route}>{text}</Link>
							</li>
						))}
					</ul>
				</nav>
			</div>
		</>
	);
}
