import { useState } from 'react'
import './App.css'
import { MoviesList } from './components/MoviesList/MoviesList'
import { SearchBar } from './components/SearchBar/SearchBar'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'
import { Footer } from './components/Footer/Footer'

function App () {
  const [sort, setSort] = useState(false)
  const { search, updateSearch, searchError } = useSearch()
  const { movies, getMovies, loading } = useMovies({ search, sort }) // moviesError disponible también

  return (
    <div className='app'>
      <h1>TVLogger</h1>
      <main className='app--main'>
        <section className='app--section'>
          <SearchBar search={search} searchError={searchError} updateSearch={updateSearch} getMovies={getMovies} sort={sort} setSort={setSort} />
        </section>
        <section className='app--section'>
          {!search
            ? <></>
            : searchError
              ? <></>
              : loading ? <p>Loading...</p> : <MoviesList movies={movies} />}
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default App
