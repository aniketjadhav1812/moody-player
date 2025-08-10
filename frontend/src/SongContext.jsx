import { createContext, useState } from "react";

export const SongContext = createContext();

export const SongProvider = ({ children }) => {
  const [mood, setMood] = useState("Not detected yet");
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);

  return (
    <SongContext.Provider
      value={{ mood, setMood, songs, setSongs, currentSong, setCurrentSong }}
    >
      {children}
    </SongContext.Provider>
  );
};
export default SongProvider;