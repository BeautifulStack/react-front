export const requester = async (url, method, json) => {
	const result = await fetch(url, {
		method: method,
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(json)
	})

	return await result.json()
}