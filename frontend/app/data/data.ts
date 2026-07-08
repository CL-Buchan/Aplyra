export const formInputs: {
	type: 'text' | 'password' | 'email';
	label: string;
	name: string;
	placeholder: string;
}[] = [
	{
		type: 'text',
		label: 'Username',
		name: 'username',
		placeholder: 'Enter username',
	},
	{
		type: 'password',
		label: 'Password',
		name: 'password',
		placeholder: 'Enter password',
	},
];
