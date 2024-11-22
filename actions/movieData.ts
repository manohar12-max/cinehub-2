import { getApiResponse } from "@/lib/request"

export const fetchTrending=async()=>{
const data=await getApiResponse("/trending/movie/week")
const trending=data.results
return trending
}

export const fetchGenresMovies=async()=>{
const data=await getApiResponse("/genre/movie/list");
// gets "genres": [
    // {
    //     "id": 28,
    //     "name": "Action"
    //   },]
const genres=data.genres
for (const genre of genres){
    const data=await getApiResponse(`/discover/movie?with_genres=${genre.id}`)
     genre.movies=data.results
    
}
return genres
}

export const fetchSearchMovies=async(query:string)=>{
    const data=await getApiResponse(`/search/movie?query=${query}`)
    const searchMovies=data.results
    return searchMovies
}

export const fetchMovieDetails=async(id:number)=>{
  const movieDetails= await getApiResponse(`/movie/${id}?append_to_response=videos`)
  return movieDetails
}