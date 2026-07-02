import Input from '../ui/Input';
import Modal from '../ui/FormModal';
import { ModalProps } from '@/app/types/types';

export default function ApplicationModal({ isOpen, onClose }: ModalProps) {
	return (
		<Modal
			header={{
				title: 'Add Job',
				description: 'Track a new job application',
			}}
			footer={{ buttons: [{ text: 'Cancel' }, { text: 'Add Job' }] }}
			onClose={onClose}
			isOpen={isOpen}>
			<div className='bg-[#151515] flex flex-col gap-[14px]'>
				<div className='w-full flex flex-col items-start gap-[6px]'>
					<label>Role</label>
					<Input type='text' placeholder='What role is the job?' />
				</div>

				<div className='w-full flex items-start gap-[12px]'>
					<div className='flex flex-col items-start gap-[6px]'>
						<label>Company</label>
						<Input
							type='text'
							placeholder="What's the company called?"
						/>
					</div>
					<div className='flex flex-col items-start gap-[6px]'>
						<label>Location</label>
						<Input
							type='text'
							placeholder='Where is the job location?'
						/>
					</div>
				</div>

				<div className='w-full flex flex-col items-start gap-[6px]'>
					<label>Status</label>
					<Input type='text' />
				</div>

				<div className='w-full flex items-start gap-[12px]'>
					<div className='flex-1 flex flex-col items-start gap-[6px]'>
						<label>Applied Date</label>
						<Input type='date' placeholder='Applied at?' />
					</div>
					<div className='flex-1 flex flex-col items-start gap-[6px]'>
						<label>Closing Date</label>
						<Input type='date' placeholder='Closing date?' />
					</div>
				</div>

				<div className='w-full flex flex-col items-start gap-[6px]'>
					<label>Job Description</label>
					<Input type='textarea' placeholder='About the job...' />
				</div>
			</div>
		</Modal>
	);
}
