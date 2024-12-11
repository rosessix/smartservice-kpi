const API_URL = 'http://localhost:5123/api'
export const fetchBase = async ({controller, endpoint, params}) => {
    try {
        let _api = `${API_URL}${controller ? `/${controller}` : ''}/${endpoint}`

        const urlParams = new URLSearchParams(params);
        _api += `?${urlParams.toString()}`;
        
        const res = await fetch(_api, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json' // Set the correct Content-Type
            },
        })

        const json = await res.json()
        return json
    } catch(err) {
        console.log(err)
        alert(err)
    }
}