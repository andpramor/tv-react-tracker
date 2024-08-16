import './MoviesList.css'

export const MoviesList = ({ movies }) => {
  return (
    <ul className='moviesList'>
      {movies.map(movie =>
        <li key={movie.id}>
          <p>{movie.title}</p>
          <div className='moviesList--imgContainer'>
            <img src={movie.poster} alt={`${movie.title} poster`} />
          </div>
        </li>
      )}
    </ul>
  )
}
