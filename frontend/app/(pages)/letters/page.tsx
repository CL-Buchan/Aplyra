import Wrapper from '@/app/components/Wrapper';

export default function Letters() {
	return (
		<Wrapper>
			<div className='w-full flex flex-col flex-1 items-center justify-center font-sans'>
				<main className='relative max-w-200 py-25 flex flex-col justify-start items-start gap-12.5 w-full px-6'>
					<div>
						<h2>Your Cover Letters</h2>
						<p>View your generated cover letters here.</p>
					</div>

					<table>
						<thead>
							<tr>
								<th>ID</th>
								<th>Job</th>
								<th># of Pages</th>
							</tr>
						</thead>

						<tbody>
							<tr>
								<td></td>
								<td></td>
								<td></td>
							</tr>
						</tbody>
					</table>
				</main>
			</div>
		</Wrapper>
	);
}
