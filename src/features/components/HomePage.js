import { useState } from "react";
import { AnimeList } from "./AnimeList";
import { MultiSelect } from "react-multi-select-component";
import { selectAllAnimes } from "../animeSlice";
import { useSelector } from "react-redux";

export const HomePage = () => {
  const [searchText, setSearchText] = useState("");
  const [filterText, setFilterText] = useState([]);
  const animeList = useSelector(selectAllAnimes);
  const filterOptions = animeList?.map((anime) => anime.genres[0].name);

  const newOptions = [...new Set(filterOptions)];
  const options = newOptions?.map((element) => ({
    value: element.toLowerCase(),
    label: element,
  }));

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <>
      <div className="container">
        <input
          className="form-control"
          type="text"
          placeholder="Search.."
          name="searchBar"
          onChange={handleChange}
        />

        <MultiSelect
          options={options}
          value={filterText}
          onChange={setFilterText}
          labelledBy="Select"
          className="select"
        />
      </div>

      <AnimeList searchText={searchText} filterText={filterText} />
    </>
  );
};
