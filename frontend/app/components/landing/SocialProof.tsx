const AVATAR_GRADIENTS = [
	'from-[#7C5CFC] to-[#5C8FF7]',
	'from-[#63B37E] to-[#5C8FF7]',
	'from-[#F87171] to-[#A78BFA]',
	'from-[#E8B93F] to-[#63B37E]',
];

const COUNT_TEXT_THRESHOLD = 25;

function avatarCountFor(count: number) {
	if (count <= 0) return 0;
	if (count < 10) return 1;
	if (count < 100) return 2;
	if (count < 1000) return 3;
	return 4;
}

export default function SocialProof({ count }: { count: number }) {
	const avatars = avatarCountFor(count);
	const showCount = count >= COUNT_TEXT_THRESHOLD;
	const rounded =
		count >= 100
			? `${Math.floor(count / 100) * 100}+`
			: `${Math.floor(count / 10) * 10}+`;

	return (
		<div className='mt-7 flex items-center gap-2.5'>
			{avatars > 0 && (
				<div className='flex -space-x-2'>
					{AVATAR_GRADIENTS.slice(0, avatars).map((gradient, i) => (
						<span
							key={i}
							aria-hidden
							className={`h-7 w-7 rounded-full bg-gradient-to-br ${gradient} ring-2 ring-[var(--background)]`}
						/>
					))}
				</div>
			)}
			<p className='text-sm text-muted'>
				{showCount ? (
					<>
						Join{' '}
						<span className='text-black dark:text-white'>
							{rounded}
						</span>{' '}
						jobseekers on the waitlist
					</>
				) : (
					<>Be one of the first on the waitlist</>
				)}
			</p>
		</div>
	);
}
