import type { Metadata } from 'next';
import { Nunito_Sans } from 'next/font/google';
import Image from 'next/image';

import './globals.css';
import Link from 'next/link';

const Nunito = Nunito_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'List Countries',
	description: 'List of countries made with NextJS',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body className={Nunito.className}>
				<main className='bg-gray-100 min-h-screen flex flex-col items-center'>
					<nav className='w-full bg-white h-16 flex items-center justify-center'>
						<section className='container flex items-center gap-2'>
							<Link href={'/'}>
								<Image
									src='/Logo.svg'
									alt='World Icon Logo'
									width={36}
									height={36}
								/>
							</Link>
							<h1 className='text-2xl font-bold text-gray-800'>
								Países do mundo
							</h1>
						</section>
					</nav>
					{children}
				</main>
			</body>
		</html>
	);
}

