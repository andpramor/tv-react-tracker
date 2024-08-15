export const MoviesList = ({ movies }) => {
  return (
    <ul>
      {movies.map(movie =>
        <li key={movie.imdbID}>
          {movie.Title}
          <img src={movie.Poster} alt={`${movie.Title} poster`} />
        </li>
      )}
    </ul>
  )
}
