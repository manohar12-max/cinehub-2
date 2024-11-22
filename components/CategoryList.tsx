import { Movie } from "@/lib/types";
import React from "react";
import MovieCard from "./MovieCard";

interface CategoryListProps {
  title: string;
  movies: Movie[];
}
const CategoryList = ({ title, movies }: CategoryListProps) => {
  return (
    <div className="category">
      <h1 className="category-title">{title}</h1>
      <div className="movie-list">
        {movies.map((movie: Movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
