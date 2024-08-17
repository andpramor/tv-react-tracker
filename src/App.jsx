import './App.css'
import { useState, useCallback } from 'react'
import debounce from 'just-debounce-it'
import { MoviesList } from './components/MoviesList/MoviesList'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'

function App () {
  const [sort, setSort] = useState(false)
  const { search, updateSearch, searchError } = useSearch()
  const { movies, getMovies, loading } = useMovies({ search, sort }) // moviesError disponible también

  const debouncedGetMovies = useCallback( // Memoize callback so it doesn't rewrite every rerender
    debounce(search => getMovies({ search: search.trim() }), 300
    ), [getMovies])

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ search: search.trim() })
  }

  const handleChange = (event) => {
    const newSearch = event.target.value
    updateSearch(newSearch)
    debouncedGetMovies(newSearch)
  }

  const toggleSort = () => {
    setSort(!sort)
  }

  return (
    <div className='app'>
      <h1>TV Tracker</h1>
      <header>
        <form onSubmit={handleSubmit} className='searchForm' style={{ display: 'flex', justifyContent: 'center', gap: '1rem', border: '1px solid black', padding: '0.5rem', borderRadius: '8px', boxShadow: '0 0 5px gray' }}>
          <label htmlFor='movieTitle'>
            <input value={search} onChange={handleChange} type='text' name='movieTitle' placeholder='Avengers, The Matrix, ...' />
          </label>
          <label htmlFor='sortCheckbox'>
            <input onChange={toggleSort} checked={sort} type='checkbox' name='sortCheckbox' />
            Order by title
          </label>
          <button type='submit'>Search</button>
        </form>
        {searchError &&
          <p style={{ color: 'red' }}>
            {searchError}
          </p>}
      </header>
      <main className='app--main'>
        {!search ? <></> : loading ? <p>Loading...</p> : <MoviesList movies={movies} />}
      </main>
    </div>
  )
}

export default App
