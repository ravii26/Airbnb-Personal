import { getAccessToken } from "../lib/actions";

const apiService = {
    get: async function (url: string): Promise<any> {
        console.log('get', url);
        const token = await getAccessToken();

        return new Promise((resolve, reject) => {

            async function fetchData(url: string): Promise<any> {
                try {
                    // Perform the fetch request
                    console.log(url)
                    const response = await fetch(`${url}`, {
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    // Check if the response is okay (status in range 200-299)
                    console.log(response)
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    // Parse the response as JSON
                    const json = await response.json();
                    console.log('Response:', json);
                    resolve(json);
                    // Return the parsed JSON data
                    return json;
                } catch (error) {
                    // Log and reject the error in case of failure
                    console.log(error)
                    console.error('Error fetching data:', error);
                    throw error; // Re-throw the error to the calling code
                }
            }
            
            const data = fetchData(url)
            console.log("Ravi")
            return data
        })
    },

    post: async function (url: string, data: any): Promise<any> {
        console.log('post', url, data);

        const token = await getAccessToken();

        return new Promise((resolve, reject) => {
            console.log("Try in apiService2")
            console.log(url)
            fetch(`${url}`, {
                method: 'POST',
                body: data,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then((json) => {
                    console.log('Response:', json);

                    resolve(json);
                })
                .catch((error => {
                    reject(error);
                }))
        })
    },

    postWithoutToken: async function (url: string, data: any): Promise<any> {
        console.log('post', url, data);

        return new Promise((resolve, reject) => {
            console.log("Try in apiservice3")
            console.log(data)
            fetch(`${url}`, {
                method: 'POST',
                body: data,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
                .then(response => {
                    if (!response.ok) {
                        reject(`Error: ${response.status}`);
                    }
                    return response.json();
                })
                .then((json) => {
                    console.log('Response:', json);

                    resolve(json);
                })
                .catch((error => {
                    reject(error);
                }))
        })
    }
}

export default apiService;