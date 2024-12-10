export const apiCall = async () => {
    try {
        const auth = btoa(process.env.REACT_APP_AUTH);
        const response = await fetch('url', {
            headers: {
                'Authorization': `Basic ${auth}`
            }
        })
        if(response.ok) {
            const data = await response.json();
            
            return {
                success: true,
                data: data
            }
        }
        else{
            return {
                success: false,
                customMessage: 'Failed to fetch patients'
            }
        }
    }
    catch (error) {
        console.error(error)
        return {
            success: false,
            error,
            customMessage: 'Failed to fetch patients'
        }
    }
    }