import { useState, type ChangeEvent, type FormEvent } from "react";
import type { SongSearchData } from "../../domain/types";

interface SongFormProps {
  onSearch: (data: SongSearchData) => void;
  onSave: () => void;
}

const initialForm: SongSearchData = {
  artist: "",
  song: "",
};

const SongForm = ({ onSearch, onSave }: SongFormProps) => {
  const [form, setForm] = useState<SongSearchData>(initialForm);
  const [isDisable, setIsDisable] = useState(true);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.artist || !form.song) {
      alert("Incomplete information");
      setIsDisable(true);
      return;
    }
    onSearch(form);
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
            onClick={onSave}
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
