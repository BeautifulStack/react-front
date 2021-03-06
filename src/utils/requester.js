export const requester = async (_authCallback, url, method, json, files) => {
  if (!files || files.length === 0) {
    const result = await fetch(url, {
      credentials: 'include',
      method: method,
      headers: {
        Accept: 'application/json',
      },
      body: JSON.stringify(json),
    })
    return await result.json()
  } else {
    const formData = new FormData()
    formData.append('request', JSON.stringify(json))
    for (let i = 0; i < files.length; i++) {
      console.log(files[i])
      formData.append('logo' + (i === 0 ? '' : i), files[i])
    }

    const result = await fetch(url, {
      credentials: 'include',
      method: method,
      headers: {
        Accept: 'application/json',
      },
      body: formData,
    })

    return await result.json()
  }
}

export const logout = async (callback) => {
  callback(false)
  fetch('http://localhost/php-back/logout/', {
    credentials: 'include',
    method: 'POST',
  })
}
