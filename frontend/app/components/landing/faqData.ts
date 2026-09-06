export interface FaqItem {
	question: string;
	answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
	{
		question: 'How does the AI cover letter generator work?',
		answer: 'Paste a job listing or upload your resume and Aplyra reads the role, the company and your background, then writes a cover letter tailored to that specific application. You can edit the draft and export it as a PDF in a couple of clicks.',
	},
	{
		question: 'Will the cover letters actually sound like me?',
		answer: 'Yes. Aplyra learns from your resume and past letters, matches your tone, and keeps the writing specific rather than generic. Every letter is a starting draft you stay in control of and can refine before sending.',
	},
	{
		question: 'Can I track my job applications in Aplyra?',
		answer: 'Every application lives on one board with statuses, follow-up reminders and closing dates, so you can see what stage each role is at from first submit to final offer without a spreadsheet.',
	},
	{
		question: 'Is Aplyra free?',
		answer: 'Early-access users get free access while we are in beta. Pricing for paid plans will be shared with the waitlist before launch, and joining the waitlist now locks in early-access perks.',
	},
	{
		question: 'When does early access open?',
		answer: 'We are onboarding waitlist members in batches over the coming weeks. Join the waitlist and we will email you the moment your invite is ready.',
	},
];
