import { useContext, useEffect, useRef, useState } from "react";
import { SongContext } from "../SongContext.jsx";

export default function SongPlayer() {
  const { songs } = useContext(SongContext);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  }, [currentSongIndex]);

  const handleSongEnd = () => {
    if (currentSongIndex < songs.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
    } else {
      setCurrentSongIndex(0); 
    }
  };

  if (!songs || songs.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-lg text-zinc-300">No songs available.</p>
      </div>
    );
  }

  return (
    <div className="song-player w-full flex flex-col items-center p-4 bg-zinc-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-white">Song Player</h2>
      <div className="song-list w-full">
        {songs.map((s, index) => (
          <div
            key={index}
            onClick={() => setCurrentSongIndex(index)}
            className={`song-item flex items-center justify-between p-2 border-b border-zinc-700 cursor-pointer ${
              index === currentSongIndex ? "bg-zinc-700" : ""
            }`}
          >
            <div className="song-info flex items-center">
              <img
                src={s.coverImage}
                alt={s.title}
                className="w-16 h-16 mr-4 rounded"
              />
              <div>
                <h3 className="text-lg font-semibold text-white">{s.title}</h3>
                <p className="text-sm text-zinc-300">{s.artist}</p>
              </div>
            </div>
            {index === currentSongIndex && (
              <audio
                ref={audioRef}
                controls
                src={s.audioFile}
                onEnded={handleSongEnd}
                autoPlay
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
