import React, { useState } from "react";

const SongForm = ({ handleSearch, handleSaveSong }) => {
  const initialForm = {
    artist: "",
    song: "",
  };

  const [form, setForm] = useState(initialForm);
  const [isDisable, setIsDisable] = useState(true);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.artist || !form.song) {
      alert("Incomplete information");
      setIsDisable(true);
      return;
    }
    handleSearch(form);
    setForm(initialForm);
    setIsDisable(false);
  };

  // console.log(isDisable);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="artist"
          placeholder="Write a Singer or a Band"
          onChange={handleChange}
          value={form.artist}
        />
        <input
          type="text"
          onChange={handleChange}
          name="song"
          value={form.song}
          placeholder="Write a song"
        />
        <button type="submit" className="button">
          Search for the song
        </button>
        {!isDisable ? (
          <button
            type="button"
            onClick={handleSaveSong}
            value="Add to Favorites"
            className="button"
          >
            {" "}
            Add to Favorites
          </button>
        ) : (
          <></>
        )}
      </form>
    </div>
  );
};

export default SongForm;
