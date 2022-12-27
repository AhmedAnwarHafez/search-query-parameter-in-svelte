import type { PageServerLoad } from './$types'
import countries from '../lib/countries.json'

export const load = (async ({ url }) => {
	const searchQuery = url.searchParams.get('q') ?? ''

	if (searchQuery === '') {
		return {
			status: 200,
			searchResult: [],
		}
	}

	const searchResult = countries.filter(
		(country) =>
			country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			country.capital.toLowerCase().includes(searchQuery.toLowerCase()),
	)

	return {
		status: 200,
		searchResult: searchResult,
	}
}) satisfies PageServerLoad
