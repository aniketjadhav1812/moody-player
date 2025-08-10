
import MoodDetector from "./MoodDetector";
import SongPlayer from "./SongPlayer";

function MoodySongs({mood}) {
  return (
    <div className="main pt-20 flex flex-col justify-center md:flex-row md:min-h-screen bg-zinc-900 text-white w-full px-12">
      <div className="mood-songs md:w-1/2 w-full flex flex-col items-center px-4">
        <h1 className="text-xl font-bold mb-4">Mood Based Music Player</h1>
        <h2 className="w-full text-center md:text-left font-bold px-7 italic">
          Mood Detector
        </h2>

        <MoodDetector />

        <h3 className="w-full text-sm text-zinc-300 px-7">
          Detected Mood: <span className="italic">{mood}</span>
        </h3>
        <p className="text-sm w-full text-zinc-300 px-7">
          Note: Camera is required for mood detection.
        </p>
        <p className="text-sm w-full text-zinc-300 px-7">
          Based on your mood, we will recommend songs that match your current
          emotional state.
        </p>
      </div>
      <div className="songs-list w-full h-screen md:w-1/2 flex flex-col items-center px-4">
        <h1 className="text-2xl w-full px-2 mb-5 font-semibold text-green-400 text-left ">
          Recommended songs ...
        </h1>
        <SongPlayer />
      </div>
    </div>
  );
}

export default MoodySongs;
