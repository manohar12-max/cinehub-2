"use client";
import { Genre, Movie, Video } from "@/lib/types";
import { AddCircle, CancelRounded, RemoveCircle } from "@mui/icons-material";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { useRouter } from "next/navigation";

interface User {
  email: string;
  username: string;
  favorites: number[];
}
const Modal = ({
  movie,
  closeModal,
}: {
  movie: Movie;
  closeModal: () => void;
}) => {
  const [video, setVideo] = useState();
  const [genres, setGenres] = useState<Genre[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const router=useRouter()
  const { data: session } = useSession();
  const getUser = async () => {
    try {
      const res = await fetch(`/api/user/${session?.user?.email}`);
      const data = await res.json();
      setUser(data);
      setIsFavorite(data.favorites.find((item: number) => item === movie.id));
    } catch (err) {
      console.log("Error fetching user", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) getUser();
  }, [session]);

  const handleMyList = async () => {
    try {
      const res = await fetch(`/api/user/${session?.user?.email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ movieId: movie.id }),
      });
      const data = await res.json();
      setUser(data);
      setIsFavorite(data.favorites.find((item: number) => item === movie.id));
      router.refresh()
    } catch (err) {
      console.log("Failed to handle myList", err);
    }
  };

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
    },
  };

  const getMovieDetails = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/movie/${movie.id}?append_to_response=videos`,
        options
      );
      const data = await res.json();
      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (video: Video) => video.type == "Trailer"
        );
        setVideo(data.videos.results[index].key);
      }
      if (data?.genres) {
        setGenres(data.genres);
      }
    } catch (e) {
      console.log("Error fetching movie details", e);
    }
  };
  useEffect(() => {
    getMovieDetails();
  }, [movie]);

  if (loading) {
    return <Loader />;
  }
  console.log(user);
  return (
    <div className="modal-bg">
      <div className="modal">
        <button className="modal-close" onClick={closeModal}>
          <CancelRounded
            sx={{
              color: "white",
              fontSize: "35px",
              ":hover": { color: "red" },
            }}
          />
        </button>
        <iframe
          src={`https://www.youtube.com/embed/${video}`}
          allowFullScreen
          className="modal-video"
          loading="lazy"
        />
        <div className="modal-content">
          <div className="flex justify-between">
            <div className="flex gap-2">
              <p className="text-base-bold">Name:</p>
              <p className="text-base-light">{movie?.title || movie?.name}</p>
            </div>
            <div className="flex gap-3">
              <p className="text-base-bold">Add to list</p>
              <p className="text-base-light">
                {isFavorite ? (
                  <RemoveCircle
                    onClick={handleMyList}
                    className="cursor-pointer text-pink-1"
                  />
                ) : (
                  <AddCircle
                    onClick={handleMyList}
                    className="cursor-pointer text-pink-1"
                  />
                )}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <p className="text-base-bold">Release Date:</p>
            <p className="text-base-light">{movie?.release_date}</p>
          </div>
          <p className="text-base-light">{movie?.overview}</p>
          <div className="flex gap-2">
            <p className="text-base-bold">Rating:</p>
            <p className="text-base-light">{movie?.vote_average}</p>
          </div>
          <div className="flex gap-2">
            <p className="text-base-bold">Genres:</p>
            <p className="text-base-light">
              {genres.map((genre) => genre.name).join(",")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
