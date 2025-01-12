const API_URL = 'http://localhost:5123/api'
export const postBase = async ({controller, endpoint, params}) => {
    try {
        const res = await fetch(`${API_URL}${controller ? `/${controller}` : ''}/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Set the correct Content-Type
            },
            body: JSON.stringify(params),
        })
        const text = await res.text();
        if (text) {
            const json = await JSON.parse(text)
            return json
        }
    } catch(err) {
        console.log(err)
        // alert(err)
    }
}