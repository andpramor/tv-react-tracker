import { useEffect, useState, useRef } from 'react'

export const useSearch = () => {
  const [search, updateSearch] = useState('')
  const [searchError, setSearchError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === '' // asigna a isFirstInput (sin hacer rerender al cambiar ni perder la referencia luego) true y luego en cuanto search !== '', le asigna false y ya no vuelve a ser true, para no sacar el error de buscar vacío hasta que se haya buscado algo.
      return
    }

    if (search === '') {
      setSearchError('*Obligatory field.')
      return
    }
    if (search.length < 3) {
      setSearchError('Three characters minimum.')
      return
    }
    setSearchError(null)
  }, [search])

  return { search, updateSearch, searchError }
}
