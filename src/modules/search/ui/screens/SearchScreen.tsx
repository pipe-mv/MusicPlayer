import Loader from "../../../../shared/ui/Loader";
import SongDetails from "../components/SongDetails";
import SongForm from "../components/SongForm";
import type {
  ArtistResponse,
  LyricResponse,
  SongSearchData,
  YouTubeSearchResponse,
} from "../../domain/types";

interface SearchScreenProps {
  search: SongSearchData | null;
  lyric: LyricResponse | null;
  bio: ArtistResponse | null;
  songYouTube: YouTubeSearchResponse | null;
  loading: boolean;
  onSearch: (query: SongSearchData) => void;
  onSave: () => void;
}

const SearchScreen = ({
  search,
  lyric,
  bio,
  songYouTube,
  loading,
  onSearch,
  onSave,
}: SearchScreenProps) => (
  <section className="search-screen">
    <h1 className="section-title">Song Search</h1>
    <SongForm onSearch={onSearch} onSave={onSave} />
    {loading && <Loader />}
    {search && !loading && (
      <SongDetails
        search={search}
        lyric={lyric}
        bio={bio}
        songYouTube={songYouTube}
      />
    )}
  </section>
);

export default SearchScreen;
