import Image from 'next/image';
import Link from 'next/link';

export default function CountryCard({
	name,
	ptName,
	flag,
	flagAlt,
}: {
	name: string;
	ptName: string;
	flag: string;
	flagAlt: string;
}) {
	return (
		<Link href={`/country/${name}`}>
			<article
				key={name}
				className='h-64 min-w-full bg-white p-2 rounded-xl hover:border-2 hover:shadow-xl cursor-pointer'>
				<div className='relative w-full h-40 p-2 overflow-hidden rounded-xl'>
					<Image
						src={flag}
						alt={flagAlt}
						fill
						className='object-cover'
					/>
				</div>
				<h1 className='text-[#3F3F3F] text-center mt-3 text-xl font-bold'>
					{ptName}
				</h1>
			</article>
		</Link>
	);
}
