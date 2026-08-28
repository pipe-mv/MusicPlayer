import type { Artist } from "../../domain/types";

interface SongArtistProps {
  artist: Artist;
}

// Presents the selected artist's biography and artwork.
const SongArtist = ({ artist }: SongArtistProps) => {
  return (
    <section className="artist">
      <div className="biography">
        <h3>{artist.strArtist}</h3>
        <p>
          {artist.intBornYear} - {artist.intDiedYear || "Present"}
        </p>
        <p>{artist.strCountry}</p>
        <p>
          {artist.strGenre} - {artist.strStyle}
        </p>
        {artist.strWebsite && (
          <a
            href={`http://${artist.strWebsite}`}
            target="_blank"
            rel="noreferrer"
          >
            Official Website
          </a>
        )}
        <p>{artist.strBiographyEN}</p>
      </div>
      <img
        className="artist-image"
        src={artist.strArtistThumb ?? undefined}
        alt={artist.strArtist}
      />
    </section>
  );
};

export default SongArtist;
