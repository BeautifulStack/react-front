export const requester = async (url, method, json, files) => {
	if (!files || files.length === 0) {
		const result = await fetch(url, {
			method: method,
			headers: {
				'Accept': 'application/json',
			},
			body: JSON.stringify(json)
		})

		return await result.json()
	} else {
		const formData = new FormData()
		formData.append('request', JSON.stringify(json))
		for (let i = 0; i<files.length; i++){
			console.log(files[i])
			formData.append('logo'+(i === 0 ? '' : i), files[i])
		}

		const result = await fetch(url, {
			method: method,
			headers: {
				'Accept': 'application/json',
			},
			body: formData
		})

		return await result.json()
	}


	
}