import { fetchSearchMovies } from '@/actions/movieData'
import { Movie } from '@/lib/types'
import React from 'react'
import MovieCard from './MovieCard'

const SearchResults = async({query}:{query:string}) => {
    let searchedMovies:Movie[]=[]
     searchedMovies=await fetchSearchMovies(query)
if(searchedMovies.length==0)return(
    <div className="search-page">
        <h1 className='text-heading2-bold text-white'>No results found for the : {query}</h1>
    </div>
)
  return (
    <div className='search-page'>
       <h1 className='text-heading2-bold text-white'>Results for the : {query}</h1>
       <div className="list">
        {
            searchedMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie}/>
            ))
 
        }
       </div>
    </div>
  )
}

export default SearchResults
