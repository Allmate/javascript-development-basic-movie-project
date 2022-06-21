const addMovieBtn = document.getElementById('add-movie-btn');
const searchMovieBtn = document.getElementById('search-btn');
const movieList = document.getElementById('movie-list');

const movies = [];

const createMovieEl = (movie) => {
  const movieEl = document.createElement('li');

  const title = movie.info.title;

  const { info } = movie;

  const extraName = Object.keys(info)[1];
  const extraValue = info[extraName];

  movieEl.textContent = `${title}, ${extraName}: ${extraValue}`;

  return movieEl;
};

const renderMovies = (filter = '', ...newMovies) => {
  if (movies.length === 0) {
    movieList.classList.remove('visible');
    return;
  }

  movieList.classList.add('visible');

  if (filter) {
    movieList.innerHTML = '';
    const filteredMovies = movies.filter((movie) =>
      movie.info.title.includes(filter)
    );

    filteredMovies.forEach((movie) => {
      const movieEl = createMovieEl(movie);
      movieList.appendChild(movieEl);
    });

    return;
  }

  newMovies.forEach((movie) => {
    const movieEl = createMovieEl(movie);
    movieList.appendChild(movieEl);
  });
};

const addMovieHandler = () => {
  const title = document.getElementById('title').value.trim();
  const extraName = document.getElementById('extra-name').value.trim();
  const extraValue = document.getElementById('extra-value').value.trim();

  if (title === '' || extraName === '' || extraValue === '') return;

  const newMovie = {
    info: {
      title,
      [extraName]: extraValue
    },
    id: Math.random().toString()
  };

  movies.push(newMovie);

  renderMovies('', newMovie);
};

const searchMovieHandler = () => {
  const searchTerm = document.getElementById('filter-title').value.trim();

  // const searchMovies = movies.filter((movie) => {
  //   const re = new RegExp(`${searchTerm}`, 'g');
  //   return re.test(movie.info.title);
  // });

  renderMovies(searchTerm);
};

addMovieBtn.addEventListener('click', addMovieHandler);

searchMovieBtn.addEventListener('click', searchMovieHandler);
