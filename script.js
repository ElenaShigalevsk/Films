const API_URL_GIRLS = "http://api.tvmaze.com/search/shows?q=girls";

getMovies(API_URL_GIRLS);

async function getMovies(url) {
    const resp = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": 'http://127.0.0.1:5500',
            "Access-Control-Allow-Credentials": "true",
        }
    });
    const respData = await resp.json();
    console.log(respData);
}


