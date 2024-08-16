import './App.css'
import { useState, useCallback } from 'react'
import debounce from 'just-debounce-it'
import { MoviesList } from './components/MoviesList/MoviesList'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'

function App () {
  const [sort, setSort] = useState(false)
  const { search, updateSearch, searchError } = useSearch()
  const { movies, getMovies, loading, error } = useMovies({ search, sort })

  const debouncedGetMovies = useCallback(
    debounce(search => getMovies({ search }), 300
    ), [getMovies])

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ search })
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
    <div style={{ padding: '15px', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
      <header>
        <h1>Little movies search engine</h1>
        <form onSubmit={handleSubmit} className='form'>
          <label htmlFor='movieTitle'>
            <input value={search} onChange={handleChange} type='text' name='movieTitle' placeholder='Avengers, The Matrix, ...' />
          </label>
          <label htmlFor='sortCheckbox'>
            <input onChange={toggleSort} checked={sort} type='checkbox' name='sortCheckbox' />
            Order by title
          </label>
          <button type='submit'>Search</button>
        </form>
        {searchError && <p style={{ color: 'red' }}>{searchError}</p>}
      </header>
      <h1>TV Tracker</h1>
      <main style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        {!search ? <></> : loading ? <p>Loading...</p> : <MoviesList movies={movies} />}
      </main>
    </div>
  )
}

export default App
