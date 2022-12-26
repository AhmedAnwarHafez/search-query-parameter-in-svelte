import type { Actions } from './$types'

export async function load({ url, fetch }) {
	const searchQuery = url.searchParams.get('q') ?? ''

	const searchResult = await (
		await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`)
	).json()

	console.log('searchResult', searchResult)

	return {
		status: 200,
		props: {
			searchQuery: searchQuery,
			searchResult: searchResult,
		},
	}
}

export const actions: Actions = {
	search: (event) => {
		console.log('search')

		return {
			data: 'Hello from search',
		}
	},
}
