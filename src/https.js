export const query = async (
    url, 
    headers,
    qs
) =>
{
    const options = {
        method : 'GET',
        headers : {
            'Content-Type' : 'application/json',
            ...headers
        }
    };

    try
    {
        let endpoint = url;
        if (qs) endpoint = `${endpoint}${qs}`;

        const response = await fetch(endpoint, options);

        const reply = await response.json();

        return {
            success : true,
            reply : reply.body
        };
    }
    catch (error)
    {
        return {
            success : false,
            error
        };
    }
};


export const mutate = async (
    url, 
    payload, 
    headers, 
    method,
    qs
) =>
{
    const options = {
        method,
        headers : {
            'Content-Type' : 'application/json',
            ...headers
        },
        body : JSON.stringify(payload)
    };

    try
    {
        let endpoint = url;
        if (qs) endpoint = `${endpoint}${qs}`;
        const response = await fetch(endpoint, options);

        let reply;
        let error;
        try 
        {
            reply = await response.json();
        } 
        catch(e)
        {
            error = e
        }
        return {
            success : response.status === 200,
            reply,
            error
        };
    }
    catch (error)
    {
        return {
            success : false,
            error
        };
    }
};