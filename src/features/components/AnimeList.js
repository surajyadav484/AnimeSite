import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { DisplayAnime } from "./DisplayAnime";

import { fetchAnimeData } from "../animeSlice";

export const AnimeList = ({ searchText, filterText }) => {
  const animeData = useSelector((state) => state.animes);
  const { animes, status, error } = animeData;

  const dispatch = useDispatch();

  const appliedFilter = filterText?.map((filter) => filter.value);
  console.log(appliedFilter);

  let filteredData = animes;
  if (searchText.trim() !== "") {
    filteredData = animes?.filter((anime) =>
      anime.title.toLowerCase().includes(searchText.toLowerCase())
    );
  } else if (appliedFilter.length > 0) {
    filteredData = animes?.filter((anime) => {
      console.log(anime.genres.map((item) => item.name));
      return appliedFilter.every((item) =>
        anime.genres.some((element) => item === element.name.toLowerCase())
      );
    });
  }

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAnimeData());
    }
  }, [status, dispatch]);

  let content;
  if (status === "loading")
    content = (
      <div className="my-spinner">
        <div
          className="spinner-border"
          style={{ width: "3rem", height: "3rem" }}
          role="status"
        >
          <span className="sr-only"></span>
        </div>
      </div>
    );
  if (status === "success") {
    content =
      filteredData.length > 0 ? (
        filteredData.map((anime) => (
          <DisplayAnime key={anime.mal_id} {...anime} />
        ))
      ) : (
        <div className="no-data">No Data Found</div>
      );
  }

  if (status === "failed") content = <h1>{error}</h1>;
  return (
    <>
      <div className="anime">{content}</div>
    </>
  );
};
