import { ModalProps } from '@/app/types/types';
import Button from './Button';
import { X } from '@untitledui/icons';
import Divider from './Divider';
import Indicator from '../Indicator';
import clsx from 'clsx';

export default function Modal({
	header: { title = 'Add title', description = 'Add description' } = {},
	body,
	footer: { buttons = [] } = {},
	children,
	onClose,
	isOpen,
}: ModalProps) {
	if (!children || (body && !body?.children))
		throw new Error('Modal body neeeds content - add child elements');

	return (
		<div
			onClick={onClose}
			className={clsx(
				'min-h-screen absolute inset-0 flex justify-center items-center',
				!isOpen ? 'hidden' : 'backdrop-blur-xl',
			)}>
			{/* Modal itself */}
			<div
				onClick={(e) => e.stopPropagation()}
				className='min-w-[520px] bg-[#151515] border border-[#FFFFFF]/10 rounded-[12px]'>
				{/* Header */}
				<div className='px-[24px] py-[20px] w-full flex justify-between items-center'>
					<div className='flex flex-col justify-start items-start gap-[3px]'>
						<p className='font-semibold text-[15px]!'>{title}</p>
						<p className='font-[13px] text-[#888888]'>
							{description}
						</p>
					</div>

					<button
						onClick={onClose}
						className='w-[28px] h-[28px] flex justify-center items-center bg-[#FFFFFF]/6 text-[#888888] rounded-[6px] border-none focus:outline-0'>
						<X className='w-[16px]' />
					</button>
				</div>

				{/* Divider line */}
				<Divider />

				{/* Body */}
				{children ? (
					<div className='px-[24px] py-[20px] w-full flex flex-col justify-start items-start gap-[14px]'>
						{children}
					</div>
				) : body?.children ? (
					<div className='px-[24px] py-[20px] w-full flex flex-col justify-start items-start gap-[14px]'>
						{body.children}
					</div>
				) : (
					<div className='px-[24px] py-[20px] text-center'>
						Add modal content
					</div>
				)}

				{/* Divider line */}
				<Divider />

				{/* Footer */}
				{buttons && buttons.length > 0 && (
					<div className='px-[24px] py-[20px] w-full flex justify-between items-center'>
						<Indicator />

						{buttons && buttons.length !== 0 ? (
							<div className='flex items-center gap-[8px]'>
								{buttons.map((button, index) => {
									const variant =
										index === 0 ? 'secondary' : 'primary';
									return (
										<Button key={index} variant={variant}>
											{button.text}
										</Button>
									);
								})}
							</div>
						) : (
							<div className='flex items-center gap-[8px]'>
								<Button variant='secondary'>Submit</Button>
								<Button>Submit</Button>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
}
