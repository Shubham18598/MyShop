import axios from "axios"
import { createContext, useContext, useEffect, useState } from "react"

const SearchContext = createContext()

const SearchProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    keyword: "",
    results: [],
  })

  return (
    <SearchContext.Provider value={[auth, setAuth]}>
      {children}
    </SearchContext.Provider>
  )
}

// useAuth is Custom Hook
const useSearch = () => useContext(SearchContext)

export { useSearch, SearchProvider }
