import axios from "axios";
import * as faceapi from "face-api.js";
import { useContext, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { SongContext } from "../SongContext";

export default function MoodDetector() {
  const webcamRef = useRef(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const { setMood, setSongs } = useContext(SongContext);

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      await faceapi.nets.faceExpressionNet.loadFromUri("/models");
      setModelsLoaded(true);
    };
    loadModels();
  }, []);

  const detectMood = async () => {
    if (!modelsLoaded) {
      alert("Models are still loading. Please wait...");
      return;
    }

    if (!isCameraOn) {
      alert("Please turn on the camera to detect mood.");
      return;
    }

    if (webcamRef.current && webcamRef.current.video.readyState === 4) {
      const detections = await faceapi
        .detectSingleFace(
          webcamRef.current.video,
          new faceapi.TinyFaceDetectorOptions()
        )
        .withFaceExpressions();

      if (detections?.expressions) {
        const expressions = detections.expressions;
        const detectedMood = Object.keys(expressions).reduce((best, mood) =>
          expressions[mood] > expressions[best] ? mood : best
        );

        setMood(detectedMood);

        try {
          const response = await axios.get(
            `https://moody-player-backend-rasa.onrender.com/songs/mood-songs?mood=${detectedMood}`
          );
          console.log("Recommended songs:", response.data);

          setSongs(response.data);
        } catch (error) {
          console.error("Error fetching songs:", error);
          setMood("Error fetching songs");
        }
      } else {
        setMood("No face detected");
      }
    }
  };

  const toggleCamera = () => {
    setIsCameraOn((prev) => !prev);
  };

  return (
    <div className="mood-detector flex md:flex-row flex-col gap-3 items-center px-6 py-2 text-white">
      {isCameraOn ? (
        <Webcam
          ref={webcamRef}
          className="webcam w-2/3 md:w-1/3 rounded-lg cover"
        />
      ) : (
        <div className="w-2/3 md:w-1/3 h-full bg-gray-800 rounded-md flex items-center px-6 py-2 justify-center">
          <p className="text-gray-400">Camera Off</p>
        </div>
      )}

      <div className="flex flex-col gap-3">
        <button
          onClick={toggleCamera}
          className="px-3 py-2 bg-gray-500 rounded-lg cursor-pointer text-sm md:text-base font-bold"
        >
          {isCameraOn ? "Turn Off Camera" : "Turn On Camera"}
        </button>

        <button
          onClick={detectMood}
          className="px-3 py-2 bg-blue-500 rounded-lg cursor-pointer text-sm md:text-base font-bold"
        >
          Detect Mood
        </button>
      </div>
    </div>
  );
}
