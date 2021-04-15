import { useEffect, useState } from 'react';
const useFetch = (url) => {

    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);

    useEffect(() => {
        const abortCont = new AbortController();

        setTimeout(() => {
            fetch(url, { signal: abortCont.signal })
                .then((res) => {
                    if (!res.ok) {
                        throw Error('Could not fetch the data for the resource')
                    }
                    return res.json();
                })
                .then((data) => {
                    setData(data);
                    setIsPending(false);
                })
                .catch((err) => {
                    if (err.name === 'AbortError') {
                        console.log('Fetch aborted');
                    } else {
                        setIsPending(false);
                        console.log(err.message);
                    }
                })
        }, 1000);

        return () => { abortCont.abort() }
    }, [url]);

    return { data, isPending }
}

export default useFetch;