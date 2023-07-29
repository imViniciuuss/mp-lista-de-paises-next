import type { Country } from '@/app/page';
import Link from 'next/link';
import Image from 'next/image';

import { BiSolidCity, BiSolidMapAlt, BiArrowBack } from 'react-icons/bi';
import { MdFamilyRestroom } from 'react-icons/md';
import { HiSpeakerphone } from 'react-icons/hi';
import CountryCard from '@/components/CountryCard';

// async function getCountryByName(name: string): Promise<Country> {
// 	const response = await fetch(
// 		`https://restcountries.com/v3.1/name/${name}?fullText=true`
// 	);
// 	return (await response.json())[0];
// }

async function getCountryByName(name: string): Promise<Country> {
	const response = await fetch('https://restcountries.com/v3.1/all');
	const countries: Country[] = await response.json();

	return countries.find((country: Country) => country.name.common === name)!;
}

async function getCountryBordersByName(name: string) {
	const response = await fetch('https://restcountries.com/v3.1/all');
	const countries: Country[] = await response.json();

	const country = countries.find(
		(country: Country) => country.name.common === name
	)!;

	return country?.borders?.map((border) => {
		const borderCountry = countries.find((country) => country.cca3 === border)!;
		return {
			name: borderCountry.name.common,
			ptName: borderCountry.translations.por.common,
			flag: borderCountry.flags.svg,
			flagAlt: borderCountry.flags.alt,
		};
	});
}

export default async function CountryPage({
	params: { name },
}: {
	params: { name: string };
}) {
	const country = await getCountryByName(decodeURI(name));
	const borderCountries = await getCountryBordersByName(name);

	const formatNumber = Intl.NumberFormat('en', { notation: 'compact' });

	return (
		<section className='flex flex-col container'>
			<h1 className='text-5xl text-center font-bold text-gray-800 my-16'>
				{country.translations.por.common}
			</h1>
			<Link
				className='flex items-center gap-1'
				href='/'>
				<BiArrowBack />
				Voltar
			</Link>
			<article className='flex md:flex-row flex-col justify-between min-w-full p-10 bg-white rounded-2xl'>
				<section className='flex flex-col gap-3'>
					{country.capital && (
						<div className='flex flex-row items-center gap-1 '>
							<div className='text-2xl'>
								<BiSolidCity />
							</div>
							<span className='text-xl text-gray-800'>
								<b>Capital:</b> {country.capital}
							</span>
						</div>
					)}
					<div className='flex flex-row items-center gap-1 '>
						<div className='text-2xl'>
							<BiSolidMapAlt />
						</div>
						<span className='text-xl text-gray-800'>
							<b>Continente:</b> {country.region}{' '}
							{country.subregion && `- ${country.subregion}`}
						</span>
					</div>
					<div className='flex flex-row items-center gap-1 '>
						<div className='text-2xl'>
							<MdFamilyRestroom />
						</div>
						<span className='text-xl text-gray-800'>
							<b>População:</b> {formatNumber.format(country.population)}
						</span>
					</div>
					{country.languages && (
						<div className='flex flex-col gap-3 bg'>
							<div className='flex gap-1'>
								<div className='text-2xl'>
									<HiSpeakerphone />
								</div>
								<span className='text-xl text-gray-800'>
									<b>Línguas faladas:</b>
								</span>
							</div>
							<div className='flex gap-1'>
								{Object.values(country.languages).map((language) => (
									<div
										key={language}
										className='bg-indigo-700 inline-block px-2 rounded-3xl font-normal text-base text-white'>
										{language}
									</div>
								))}
							</div>
						</div>
					)}
				</section>
				<div className='relative h-48 my-2 md:h-auto w-96 shadow-md md:order-last order-first'>
					<Image
						src={country.flags.svg}
						alt={country.flags.alt}
						fill
						className='object-cover'
					/>
				</div>
			</article>
			<section className=''>
				<h3 className='mt-12 text-3xl font-bold text-gray-800'>
					Países que fazem fronteira
				</h3>
				{borderCountries ? (
					<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full container gap-2'>
						{borderCountries?.map((border) => (
							<CountryCard
								{...border}
								key={border.name}
							/>
						))}
					</div>
				) : (
					<span className='text-xl text-red-500'>
						Esse país não tem fronteiras!
					</span>
				)}
			</section>
		</section>
	);
}
