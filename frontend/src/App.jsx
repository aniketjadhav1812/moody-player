import { useContext } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import AllSongs from "./components/AllSongs";
import MoodySongs from "./components/MoodySongs";
import Navbar from "./components/Navbar";
import PageNotFound from "./components/PageNotFound";
import UploadSong from "./components/UploadSong";
import { SongContext } from "./SongContext";

export default function App() {
  const { mood } = useContext(SongContext);
  // const [currentSong, setCurrentSong] = useState(null);

  return (
    <Router>
      <div className="App flex flex-col w-full">
        <Navbar />
        <Routes>
          <Route path="/moody-songs" element={<MoodySongs mood={mood} />} />
          <Route path="/all-songs" element={<AllSongs />} />
          <Route path="/upload" element={<UploadSong />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </Router>
  );
}
