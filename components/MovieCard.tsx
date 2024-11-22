"use client";
import { baseUrl } from "@/lib/constants";
import { Movie } from "@/lib/types";
import React, { useState } from "react";
import Modal from "./Modal";

const MovieCard = ({ movie }: { movie: Movie }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <>
      <div
        className="movie-card"
        onClick={() => {
          openModal();
        }}
      >
        <img
          alt={movie?.name || movie?.title}
          className="thumbnail"
          src={movie?.backdrop_path || movie?.poster_path?`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`:`/images/hero.jpg`}
        />
        <div className="border"></div>
      </div>
      {showModal && <Modal movie={movie} closeModal={closeModal}/>}
    </>
  );
};

export default MovieCard;
