import React, { useState } from "react";
import { useEffect } from "react";
import { HashRouter, Link, Switch, Route } from "react-router-dom";
import FavSongTable from "./FavSongsTable";
import SongDetails from "./SongDetails";
import SongForm from "./SongForm";
import SongPage from "./SongPage";
import Loader from "../images/Loader";
import { helpHttp } from "../helpers/helpHttp";
import Error404 from "../pages/Error404";
import "../css/App.css";
import Logo from "../images/Logo.png";
import HomeLogo from "../images/home.png";
import Footer from "./Footer";

// console.log(process.env);
const YOUTUBE_API = process.env.REACT_APP_YOUTUBE_API_KEY;
const mySongsInit = JSON.parse(localStorage.getItem("mySongs")) || [];

// console.log(SongTest.items[0]);

const SongSearch = () => {
  //Controls the singer and song search, if there's not singer or song it will be kept "null" in order to not show the artist
  const [search, setSearch] = useState("");
  //Handles the lyric of the artist's song
  const [lyric, setLyric] = useState(null);
  //Handles the information of the artist
  const [bio, setBio] = useState(null);
  //Handles the informatin about the YouTube id
  const [youTubeId, setYouTubeId] = useState(null);
  //Saves my song to my favorites
  const [mySongs, setMySongs] = useState(mySongsInit);
  //Handles the loading cirlce image
  const [loading, setLoading] = useState(false);
  //Handles the YouTube url with the song information
  const [songYouTube, setSongYouTube] = useState("");
  //handles the favorite song selected from the carousel
  const [favIdSelected, setFavIdSelected] = useState("");

  useEffect(() => {
    if (search === "") return;

    const fetchData = async () => {
      const { artist, song } = search;

      let artistUrl = `https://www.theaudiodb.com/api/v1/json/2/search.php?s=${artist}`;
      let songUrl = `https://api.lyrics.ovh/v1/${artist}/${song}`;

      let playerSearch = `https://www.googleapis.com/youtube/v3/search?maxResults=1&relevanceLanguage=en&regionCode=AU&topicId=/m/04rlf&part=snippet&q=${artist}%20${song}&key=${YOUTUBE_API}`;
      // console.log(playerSearch);

      setLoading(true);

      const [artistRes, songRes] = await Promise.all([
        helpHttp().get(artistUrl),
        helpHttp().get(songUrl),
      ]);
      // console.log(artistRes, songRes);

      setBio(artistRes);
      setLyric(songRes);

      if (songRes.err === true || artistRes.artists === null) {
        console.log("error before loading api 1");
        setLoading(false);
        return;
      }

      const playerRes = await Promise.all([helpHttp().get(playerSearch)]);
      // console.log(playerRes);

      setSongYouTube(playerRes[0]);
      setYouTubeId(playerRes[0].items[0].id.videoId);
      setLoading(false);
    };
    fetchData();
    localStorage.setItem("mySongs", JSON.stringify(mySongs));
  }, [search, mySongs]);

  // console.log(youTubeId);
  const handleSearch = (data) => {
    // console.log(data);
    setSearch(data);
  };

  // console.log(search);
  // console.log(lyric);
  // console.log(bio);
  // console.log(youTubeId);

  const handleSaveSong = () => {
    if (lyric.err === true || bio.artists === null) {
      return alert("The song can not be saved, Try it again!");
    }

    // console.log("saving the song to favorites");
    let currentSong = {
      search,
      lyric,
      bio,
      songYouTube,
    };

    let songs = [...mySongs, currentSong];
    setMySongs(songs);
    // setSearch(null);
    localStorage.setItem("mySongs", JSON.stringify(songs));
  };

  const handleDeleteSong = (id) => {
    let isDelete = window.confirm(
      `¿Are you sure of deleting this wonderful song?`
    );

    if (isDelete) {
      let songs = mySongs.filter((song, index) => index !== id);
      setMySongs(songs);
      localStorage.setItem("mySongs", JSON.stringify(songs));
    }
  };

  // console.log(search, lyric, bio, songYouTube);

  const favId = (id) => {
    // console.log("this is favId function", id);
    let searchData = mySongs.filter((song, index) =>
      index === id ? song : ""
    );
    // console.log("song equal", searchData);

    setFavIdSelected(searchData);
    setSearch(searchData[0].search);
    setBio(searchData[0].bio);
    setLyric(searchData[0].lyric);
    // console.log(searchData[0].songYouTube);
    setSongYouTube(searchData[0].songYouTube);
  };
  // console.log(search, lyric, bio, songYouTube);
  // console.log("favIdSelected", favIdSelected);

  return (
    <div>
      <HashRouter>
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
          <Switch>
            <Route exact path="/">
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
                  favId={favIdSelected}
                  youTubeId={youTubeId}
                />
              )}
            </Route>
            <Route
              exact
              path="/:id"
              children={
                <SongPage
                  mySongs={mySongs}
                  songYouTube={songYouTube}
                  favId={favIdSelected}
                  youTubeId={youTubeId}
                />
              }
            ></Route>
            <Route path="*" children={<Error404 />} />
          </Switch>
        </article>
        <Footer />
      </HashRouter>
    </div>
  );
};

export default SongSearch;
