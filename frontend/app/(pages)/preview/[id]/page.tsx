import Wrapper from '@/app/components/Wrapper';
import { createClient } from '@/app/services/supabase/server';

export default async function PreviewDocument({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const supabase = await createClient();
	// const { data, error } = await supabase.storage.from(id);
	return (
		<Wrapper>
			<div className='w-full flex flex-cosl flex-1 items-center justify-center font-sans'>
				<main className='relative max-w-200 py-25 flex flex-col justify-start items-start gap-12.5 w-full px-6'>
					<h2>Preview</h2>

					<iframe src={''} width='100%' height='500px'>
						<p>
							This browser does not support PDFs. Please download
							the PDF to view it:{' '}
							<a href='path-to-your-document.pdf'>Download PDF</a>
							.
						</p>
					</iframe>
				</main>
			</div>
		</Wrapper>
	);
}
