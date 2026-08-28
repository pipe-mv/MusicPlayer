import { HashRouter, Link, Route, Routes } from "react-router-dom";
import { useFavorites } from "../modules/favorites/application/useFavorites";
import FavoritesCarousel from "../modules/favorites/ui/components/FavoritesCarousel";
import FavoriteSongScreen from "../modules/favorites/ui/screens/FavoriteSongScreen";
import { useSongSearch } from "../modules/search/application/useSongSearch";
import SearchScreen from "../modules/search/ui/screens/SearchScreen";
import Footer from "../layout/Footer";
import Error404 from "../pages/Error404";
import Logo from "../images/Logo.png";
import HomeLogo from "../images/home.png";
import "../css/App.css";

// Connects search and favorites state to the application routes.
const App = () => {
  const songSearch = useSongSearch();
  const { favorites, addFavorite, deleteFavorite } = useFavorites();

  const handleSaveSong = () => {
    if (!songSearch.currentSong) {
      window.alert("The song can not be saved. Try searching again.");
      return;
    }

    addFavorite(songSearch.currentSong);
  };

  const handleDeleteSong = (id: number) => {
    const shouldDelete = window.confirm(
      "¿Are you sure of deleting this wonderful song?"
    );

    if (shouldDelete) deleteFavorite(id);
  };

  return (
    <HashRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <div className="app-shell">
        <header className="site-header">
          <img className="logo" src={Logo} alt="MusicPlayer" />
          <Link to="/" className="home-link" aria-label="Go to song search">
            <img className="homeIcon" src={HomeLogo} alt="" />
          </Link>
        </header>

        <section className="favorites-section" aria-label="Favourite songs">
          <FavoritesCarousel
            favorites={favorites}
            onDelete={handleDeleteSong}
            onSelect={(id) => {
              const selectedSong = favorites[id];
              if (selectedSong) songSearch.selectSong(selectedSong);
            }}
          />
        </section>

        <main className="app-main">
          <Routes>
          <Route
            path="/"
            element={
              <SearchScreen
                search={songSearch.search}
                lyric={songSearch.lyric}
                bio={songSearch.bio}
                songYouTube={songSearch.songYouTube}
                loading={songSearch.loading}
                onSearch={songSearch.searchSong}
                onSave={handleSaveSong}
              />
            }
          />
          <Route
            path="/:id"
            element={<FavoriteSongScreen favorites={favorites} />}
          />
          <Route path="*" element={<Error404 />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;
