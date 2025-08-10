import axios from "axios";
import { useEffect, useRef, useState } from "react";

function AllSongs() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSongId, setActiveSongId] = useState(null);
  const audioRefs = useRef({}); // store refs for each audio

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await axios.get("https://moody-player-backend-rasa.onrender.com/songs/all-songs");
        setSongs(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching songs");
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, []);

  const handlePlay = (id) => {
    // Pause all other songs
    Object.keys(audioRefs.current).forEach((key) => {
      if (key !== id && audioRefs.current[key]) {
        audioRefs.current[key].pause();
      }
    });
    setActiveSongId(id);
  };

  if (loading) return <p className="text-center text-gray-300">Loading songs...</p>;
  if (error) return <p className="text-center text-red-400">{error}</p>;

  return (
    <div className="p-6 bg-zinc-900 min-h-screen text-white">
      <h2 className="text-2xl font-bold mb-6 text-center">🎵 All Songs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {songs.map((song) => (
          <div
            key={song._id}
            className="bg-gray-800 hover:bg-gray-700 transition-colors duration-200 shadow-lg rounded-lg p-4 flex flex-col items-center"
          >
            {song.coverImage && (
              <img
                src={song.coverImage}
                alt={song.title}
                className="w-32 h-32 object-cover rounded-md mb-3 border border-gray-600"
              />
            )}
            <h3 className="text-lg font-semibold">{song.title}</h3>
            <p className="text-sm text-gray-400">{song.artist}</p>
            <audio
              ref={(el) => (audioRefs.current[song._id] = el)}
              controls
              src={song.audioFile}
              className="mt-3 w-full"
              onPlay={() => handlePlay(song._id)}
            ></audio>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllSongs;
