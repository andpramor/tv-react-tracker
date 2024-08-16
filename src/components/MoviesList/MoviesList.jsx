import './MoviesList.css'

export const MoviesList = ({ movies }) => {
  return (
    <ul className='moviesList'>
      {movies.map(movie =>
        <li key={movie.imdbID}>
          <p>{movie.Title}</p>
          <div className='moviesList--imgContainer'>
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
          </div>
        </li>
      )}
    </ul>
  )
}
