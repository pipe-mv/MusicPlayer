import type { Artist } from "../types/music";

interface SongArtistProps {
  artist: Artist;
}

const SongArtist = ({ artist }: SongArtistProps) => {
  return (
    <div className="artist">
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
      <img src={artist.strArtistThumb ?? undefined} alt={artist.strArtist} />
    </div>
  );
};

export default SongArtist;
