import { LogOut01, UserCircle } from "@untitledui/icons";
import clsx from "clsx";
import Link from "next/link";

export default function Profile() {
    let userLoggedIn;
    let pathname;
    let email;
    let signUserOut;
    let isLoading;
	return (
		<>
			{userLoggedIn && (
				<div className='flex flex-row gap-2 border-t border-white/10 pt-4'>
					<div
						className={
							'flex items-center rounded-[7px] px-2.5 py-2 flex-row justify-center gap-4'
						}>
						<Link
							href='/dashboard/user/profile'
							className={clsx(
								'flex min-w-0 items-center gap-2.5 text-[13px] transition-colors duration-300 ease-in-out',
								pathname === '/dashboard/user/profile'
									? 'font-medium text-white'
									: 'text-[#888888] hover:text-white',
							)}>
							<UserCircle
								width={18}
								height={18}
								className='shrink-0'
							/>
							<span className='truncate'>{email}</span>
						</Link>

						<button
							type='button'
							onClick={signUserOut}
							disabled={isLoading}
							aria-label='Sign out'
							className='shrink-0 text-[#888888] transition-colors duration-300 ease-in-out hover:text-white disabled:opacity-50'>
							<LogOut01 width={16} height={16} />
						</button>
					</div>
				</div>
			)}
		</>
	);
}
