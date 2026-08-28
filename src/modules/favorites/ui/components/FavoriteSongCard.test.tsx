import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FavoriteSongCard from "./FavoriteSongCard";
import type { FavoriteSong } from "../../domain/types";

const favorite: FavoriteSong = {
  search: { artist: "Test Artist", song: "Test Song" },
  bio: {
    artists: [
      { strArtist: "Test Artist", strArtistThumb: "https://example.com/artist.jpg" },
    ],
  },
  lyric: { lyrics: "Test lyrics" },
  songYouTube: { items: [] },
};

test("toggles the favourite actions when the artwork is pressed", async () => {
  const user = userEvent.setup();

  render(
    <FavoriteSongCard
      id={0}
      elem={favorite}
      handleDeleteSong={jest.fn()}
      handleDirection={jest.fn()}
    />,
  );

  const artwork = screen.getByRole("button", {
    name: "Show actions for Test Song by Test Artist",
  });
  const card = artwork.closest(".card");

  expect(artwork).toHaveAttribute("aria-expanded", "false");
  expect(card).not.toHaveClass("is-actions-visible");

  await user.click(artwork);

  expect(artwork).toHaveAttribute("aria-expanded", "true");
  expect(card).toHaveClass("is-actions-visible");

  await user.click(artwork);

  expect(artwork).toHaveAttribute("aria-expanded", "false");
  expect(card).not.toHaveClass("is-actions-visible");
});
