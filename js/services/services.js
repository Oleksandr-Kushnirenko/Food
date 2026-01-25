    // отправка данных с клиента на json-сервер / запрос на сервер
    const postData = async (url, data) => {     // эта функция настраивает наш запрос, она афетчит (посылает) этот запрос на сервер, получает какой-то товет от сервера и трансформирует этот ответ в json
        const res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': "application/json"
            },
            body: data
        });
        return await res.json();
    };

    async function getResource(url) {
        let res = await fetch(url);
        
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, statue: ${res.status}`);
        }

        return await res.json();
    };

    export {postData};
    export {getResource};