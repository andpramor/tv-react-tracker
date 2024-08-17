import './MoviesList.css'

const MoviesListWithMovies = ({ movies }) => {
  return (
    <ul className='moviesList'>
      {movies.map(movie =>
        <li key={movie.id}>
          <p>{movie.title}</p>
          <div className='moviesList--imgContainer'>
            {movie.poster !== 'N/A'
              ? <img src={movie.poster} alt={`${movie.title} poster`} />
              : <p>No poster available at the moment</p>}
          </div>
        </li>
      )}
    </ul>
  )
}

const NoMovies = () => {
  return <p>No results found</p>
}

export const MoviesList = ({ movies }) => {
  const hasMovies = movies?.length > 0

  return (
    hasMovies
      ? <MoviesListWithMovies movies={movies} />
      : <NoMovies />
  )
}
