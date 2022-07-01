const API_URL_GIRLS = "https://api.tvmaze.com/search/shows?q=girls";

getMovies(API_URL_GIRLS);

async function getMovies(url) {
    const resp = await fetch(url);
    
    const respData = await resp.json();
    console.log(respData);
    showMovies(respData);
}

function showMovies(data) {
    const moviesEl = document.querySelector('.movies');

    document.querySelector(".movies").innerHTML = "";

    data.forEach(movie => {
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
        <div class="movie__cover-inner">
            <img src="${movie.show.image.original}" class="movie__cover" alt="${movie.show.name}"/>
        <div class="movie__cover--darkened"></div>
        </div>
        <div class="movie__info">
            <div class="movie__title">${movie.show.name}</div>
            <div class="movie__category">
            ${movie.show.genres.map(
                (genre) => `${genre}`
              )}
            </div>
            <div class="movie__lang">${movie.show.language}</div>
            <div class="movie__average">${movie.show.rating.average}</div>
            <div class="movie__desc">${movie.show.summary}</div>
        </div>
        `;
        moviesEl.appendChild(movieEl);
    });
}

const API_URL_SEARCH = 'https://api.tvmaze.com/search/shows?q=';

const form = document.querySelector("form");
const search = document.querySelector(".search__input");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const apiSearchUrl = `${API_URL_SEARCH}${search.value}`;
  if (search.value) {
    getMovies(apiSearchUrl);

    search.value = "";
  }
});