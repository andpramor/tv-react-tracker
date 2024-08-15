import './App.css'
import { Search as movies } from './mocks/omdb_list.json'
import { MoviesList } from './components/MoviesList/MoviesList'

function App () {
  return (
    <div style={{ padding: '15px' }}>
      <h1>TV Tracker Project</h1>
      <MoviesList movies={movies} />
    </div>
  )
}

export default App
