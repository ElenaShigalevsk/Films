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
  
    let pagination = document.querySelector('.pagination');
    let notesOnPage = 6;
    let countOfItems = Math.ceil(data.length / notesOnPage);
    console.log (data.length);
    let items = [];
    for (let i=1; i <= countOfItems; i++) {
        let li = document.createElement('li');
        li.innerHTML = i;
        pagination.appendChild(li);
        items.push(li);
    }
    showPage(items[0]);

    for (let item of items) {
        item.addEventListener('click', function() {
            showPage(this);
        });
    }

    function showPage(item) {
        let active = document.querySelector('.pagination li.active');
        if (active) {
            active.classList.remove('active');    
        }
        item.classList.add('active');
        
        let pageNum = +item.innerHTML;
        let start = (pageNum - 1) * notesOnPage;
        let end = start + notesOnPage;

        let notes = data.slice(start, end);
        // moviesEl.innerHTML = '';
        for (let movie of notes) {
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
        }
    }
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

