type Props = {
	children: React.ReactNode;
	route?: string;
	hideBackButton?: boolean;
};

export default function Wrapper({ children }: Props) {
	return (
		<div className='max-w-full w-full h-screen flex-1 flex flex-col justify-start font-sans text-zinc-50'>
			{children}
		</div>
	);
}
