import { useCallback } from 'react'
import './SearchBar.css'
import debounce from 'just-debounce-it'

export const SearchBar = ({ search, searchError, updateSearch, getMovies, sort, setSort }) => {
  const debouncedGetMovies = useCallback( // Memoize callback so it doesn't rewrite every rerender
    debounce(search => getMovies({ search: search.trim(), sort }), 300
    ), [getMovies])

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ search: search.trim(), sort })
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
    <form onSubmit={handleSubmit} className='searchBar'>
      <fieldset>
        <label htmlFor='movieTitle'>
          <input value={search} onChange={handleChange} type='text' name='movieTitle' placeholder='Avengers, The Matrix, ...' />
        </label>
        {searchError &&
          <p className='searchBar--error'>
            {searchError}
          </p>}
      </fieldset>
      <fieldset className='searchBar--filters'>
        <label onClick={toggleSort} htmlFor='sortCheckbox' className='searchBar--checkboxContainer'>
          <input onChange={toggleSort} checked={sort} type='checkbox' name='sortCheckbox' />
          Order by title
        </label>
        <label htmlFor='anotherCheckbox' className='searchBar--checkboxContainer'>
          <input type='checkbox' name='anotherCheckbox' />
          Order by year (to be done)
        </label>
      </fieldset>
      <button type='submit'>Search</button>
    </form>
  )
}
