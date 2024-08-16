import { useMemo, useRef, useState } from 'react'
import { searchMovies } from '../services/movies'

export const useMovies = ({ search, sort }) => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [moviesError, setMoviesError] = useState(null)
  const previousSearch = useRef(search) // Here to avoid a search to be run more than once consecutively

  const getMovies = useMemo(() => {
    return async ({ search }) => {
      if (search === previousSearch.current) return
      try {
        setLoading(true)
        setMoviesError(null)
        previousSearch.current = search
        const newMovies = await searchMovies({ search })
        setMovies(newMovies)
      } catch (e) {
        setMoviesError(e.message)
      } finally {
        setLoading(false)
      }
    }
  }, [])

  const sortedMovies = useMemo(() => { // Only reruns when dependencies vary
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title)) // localeCompare includes locale accents to compare
      : movies
  }, [sort, movies])

  return { movies: sortedMovies, getMovies, loading, moviesError }
}
