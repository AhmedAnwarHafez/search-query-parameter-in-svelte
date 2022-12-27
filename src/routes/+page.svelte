<script lang="ts">
	import { page } from '$app/stores'
	import { goto } from '$app/navigation'
	import type { PageData } from './$types'

	export let data: PageData

	let searchQuery = ''

	let onSubmit = async () => {
		let currentSearchTerm = ''

		const currentUrlParams = new URLSearchParams($page.url.searchParams)
		currentSearchTerm = currentUrlParams.get('q') || ''

		if (searchQuery.trim() == currentSearchTerm?.trim()) return

		// make a new query string
		let query = new URLSearchParams($page.url.searchParams.toString())

		query.set('q', searchQuery)
		goto(`?${query.toString()}`, { keepFocus: true })
	}
</script>

<section class="flex flex-col items-center gap-10 p-5 container">
	<form
		method="GET"
		action="/api/search"
		class="flex flex-col gap-4 w-2/4 border border-zinc-800 p-5 rounded-3xl"
		on:submit|preventDefault|stopPropagation={onSubmit}
	>
		<label for="query" class="text-zinc-400 text-5xl">Search</label>
		<input
			type="search"
			name="search"
			bind:value={searchQuery}
			class="text-5xl bg-zinc-600 text-zinc-200"
		/>
	</form>

	{#each data.searchResult as result}
		<div class="flex flex-col gap-4 w-2/4 border border-zinc-800 p-5 rounded-3xl">
			<h1 class="text-zinc-400 text-5xl">{result.name}</h1>
			<p class="text-zinc-200 text-3xl">{result.capital}</p>
			<p class="text-zinc-200 text-3xl">{result.population}</p>
		</div>
	{/each}
</section>
