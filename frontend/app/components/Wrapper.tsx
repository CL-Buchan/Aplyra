import BackButton from './ui/BackButton';

type Props = { children: React.ReactNode };

export default function Wrapper({ children }: Props) {
	return (
		<div className='p-10 flex-1 w-full flex flex-col justify-start font-sans text-zinc-50 bg-black'>
			<BackButton />

			{children}
		</div>
	);
}
