import BackButton from './ui/BackButton';

type Props = {
	children: React.ReactNode;
	route?: string;
	hideBackButton?: boolean;
};

export default function Wrapper({ children, route, hideBackButton }: Props) {
	return (
		<div className='my-10 max-w-250 flex-1 w-full flex flex-col justify-start font-sans text-zinc-50 bg-black'>
			{!hideBackButton && <BackButton route={route} />}
			{children}
		</div>
	);
}
