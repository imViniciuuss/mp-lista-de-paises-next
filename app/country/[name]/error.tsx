'use client';

import Image from 'next/image';
import Link from 'next/link';

import { BiArrowBack } from 'react-icons/bi';

export default function Error() {
	return (
		<section className='flex-1 flex-col flex mt-14 items-center container gap-7'>
			<Image
				src='/construction.png'
				width={88}
				height={88}
				alt='Constructor'
			/>
			<h1 className='text-2xl text-center font-bold'>
				Algo deu errado... Não foi possível mostrar o país!
			</h1>
			<Link href='/'>
				<div className='flex flex-row justify-center items-center gap-2 bg-green-400 w-32 p-3 rounded-xl text-white'>
					<BiArrowBack />
					<span>Voltar</span>
				</div>
			</Link>
		</section>
	);
}
