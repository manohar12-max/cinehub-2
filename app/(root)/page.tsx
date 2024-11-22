import { fetchGenresMovies } from "@/actions/movieData";
import CategoryList from "@/components/CategoryList";
import Hero from "@/components/Hero";
import Navbar from "@/components/navbar";
import { Genre } from "@/lib/types";


export default async function Home() {
  const genres = await fetchGenresMovies();

  return (
  <div className="">
    <Navbar/>
    <Hero/>
    <div className="all-movies">
       {
        genres.map((genre:Genre)=>(
          <CategoryList key={genre.id} title={genre.name} movies={genre.movies}/>
        ))
       }
    </div>
  </div>
  );
}

