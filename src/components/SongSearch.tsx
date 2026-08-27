import { useEffect, useState } from "react";
import { HashRouter, Link, Routes, Route } from "react-router-dom";
import FavSongTable from "./FavSongsTable";
import SongDetails from "./SongDetails";
import SongForm from "./SongForm";
import SongPage from "./SongPage";
import Loader from "../images/Loader";
import { helpHttp, isHttpError } from "../helpers/helpHttp";
import Error404 from "../pages/Error404";
import "../css/App.css";
import Logo from "../images/Logo.png";
import HomeLogo from "../images/home.png";
import Footer from "./Footer";
import type {
  ArtistResponse,
  FavoriteSong,
  LyricResponse,
  SongSearchData,
  YouTubeSearchResponse,
} from "../types/music";

// console.log(process.env);
const YOUTUBE_API = process.env.REACT_APP_YOUTUBE_API_KEY;

const loadFavoriteSongs = (): FavoriteSong[] => {
  const savedSongs = localStorage.getItem("mySongs");

  if (!savedSongs) return [];

  try {
    const parsedSongs: unknown = JSON.parse(savedSongs);
    return Array.isArray(parsedSongs) ? (parsedSongs as FavoriteSong[]) : [];
  } catch {
    return [];
  }
};

// console.log(SongTest.items[0]);

const SongSearch = () => {
  //Controls the singer and song search, if there's not singer or song it will be kept "null" in order to not show the artist
  const [search, setSearch] = useState<SongSearchData | null>(null);
  //Handles the lyric of the artist's song
  const [lyric, setLyric] = useState<LyricResponse | null>(null);
  //Handles the information of the artist
  const [bio, setBio] = useState<ArtistResponse | null>(null);
  //Saves my song to my favorites
  const [mySongs, setMySongs] = useState<FavoriteSong[]>(loadFavoriteSongs);
  //Handles the loading cirlce image
  const [loading, setLoading] = useState(false);
  //Handles the YouTube url with the song information
  const [songYouTube, setSongYouTube] =
    useState<YouTubeSearchResponse | null>(null);

  useEffect(() => {
    if (!search) return;

    const fetchData = async () => {
      const { artist, song } = search;

      const artistUrl = `https://www.theaudiodb.com/api/v1/json/2/search.php?s=${encodeURIComponent(artist)}`;
      const songUrl = `https://api.lyrics.ovh/v1/${encodeURIComponent(artist)}/${encodeURIComponent(song)}`;

      const playerSearch = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(`${artist} ${song}`)}&type=video&maxResults=3&key=${YOUTUBE_API}&quotaUser=test789`;
      // let playerSearch = `https://www.googleapis.com/youtube/v3/search?maxResults=1&relevanceLanguage=en&regionCode=AU&topicId=/m/04rlf&part=snippet&q=${artist}%20${song}&key=${YOUTUBE_API}`;
      setLoading(true);

      const [artistRes, songRes] = await Promise.all([
        helpHttp().get<ArtistResponse>(artistUrl),
        helpHttp().get<LyricResponse>(songUrl),
      ]);
      // console.log(artistRes, songRes);

      setBio(isHttpError(artistRes) ? null : artistRes);
      setLyric(songRes);

      if (
        isHttpError(songRes) ||
        isHttpError(artistRes) ||
        artistRes.artists === null
      ) {
        console.log("error before loading api 1");
        setLoading(false);
        return;
      }
      const playerRes = await helpHttp().get<YouTubeSearchResponse>(playerSearch);

      if (isHttpError(playerRes) || !playerRes.items.length) {
        console.error("YouTube search failed", playerRes);
        setLoading(false);
        return;
      }

      setSongYouTube(playerRes);
      setLoading(false);
    };
    fetchData();
    localStorage.setItem("mySongs", JSON.stringify(mySongs));
  }, [search, mySongs]);

  // console.log(youTubeId);
  const handleSearch = (data: SongSearchData) => {
    // console.log(data);
    setSearch(data);
  };

  // console.log(search);
  // console.log(lyric);
  // console.log(bio);
  // console.log(youTubeId);

  const handleSaveSong = () => {
    if (
      !search ||
      !lyric ||
      !bio ||
      !songYouTube ||
      lyric.err === true ||
      bio.artists === null
    ) {
      return alert("The song can not be saved, Try it again!");
    }

    // console.log("saving the song to favorites");
    const currentSong: FavoriteSong = {
      search,
      lyric,
      bio,
      songYouTube,
    };

    const songs = [...mySongs, currentSong];
    setMySongs(songs);
    // setSearch(null);
    localStorage.setItem("mySongs", JSON.stringify(songs));
  };

  const handleDeleteSong = (id: number) => {
    const isDelete = window.confirm(
      `¿Are you sure of deleting this wonderful song?`
    );

    if (isDelete) {
      const songs = mySongs.filter((_song, index) => index !== id);
      setMySongs(songs);
      localStorage.setItem("mySongs", JSON.stringify(songs));
    }
  };

  // console.log(search, lyric, bio, songYouTube);

  const favId = (id: number) => {
    // console.log("this is favId function", id);
    const selectedSong = mySongs[id];

    if (!selectedSong) return;
    // console.log("song equal", searchData);

    setSearch(selectedSong.search);
    setBio(selectedSong.bio);
    setLyric(selectedSong.lyric);
    // console.log(searchData[0].songYouTube);
    setSongYouTube(selectedSong.songYouTube);
  };
  // console.log(search, lyric, bio, songYouTube);
  // console.log("favIdSelected", favIdSelected);

  return (
    <div>
      <HashRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <img className="logo" src={Logo} alt="Music logo"></img>

        <div className="container mt-5 carousel">
          <FavSongTable
            mySongs={mySongs}
            handleDeleteSong={handleDeleteSong}
            favId={favId}
          />
        </div>

        <header>
          <Link to="/" className="selected">
            <img className="homeIcon" src={HomeLogo} alt="home" />
          </Link>
        </header>
        {/* {song} */}
        <article>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <h2>Song Search</h2>
                  <SongForm
                    handleSearch={handleSearch}
                    handleSaveSong={handleSaveSong}
                    // songs={song}
                  />
                  {loading && <Loader />}
                  {search && !loading && (
                    <SongDetails
                      search={search}
                      lyric={lyric}
                      bio={bio}
                      songYouTube={songYouTube}
                    />
                  )}
                </>
              }
            />
            <Route
              path="/:id"
              element={
                <SongPage
                  mySongs={mySongs}
                />
              }
            />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </article>
        <Footer />
      </HashRouter>
    </div>
  );
};

export default SongSearch;
