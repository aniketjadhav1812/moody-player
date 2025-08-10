import express from "express";
import multer from "multer";
import songModel from "../models/song.model.js";
import { uploadAudio, uploadImage } from "../services/storage.service.js";
const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/upload",
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "audioFile", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { title, artist, mood } = req.body;
      if (!title || !artist || !mood) {
        return res
          .status(400)
          .json({ message: "Title, artist, and genre are required" });
      }
      if (!req.files || !req.files.coverImage || !req.files.audioFile) {
        return res
          .status(400)
          .json({ message: "Cover image and audio file are required" });
      }
      const coverImage = req.files.coverImage[0];
      const audioFile = req.files.audioFile[0];

      const imageData = await uploadImage(req.files.coverImage[0].buffer);
      const audioData = await uploadAudio(req.files.audioFile[0].buffer);

      const song = await songModel.create({
        title,
        artist,
        mood,
        coverImage: imageData.url,
        audioFile: audioData.url,
      });

      res.status(201).json({
        message: "Song uploaded successfully",
        song: {
          id: song._id,
          title: song.title,
          artist: song.artist,
          mood: song.mood,
          coverImage: song.coverImage,
          audioFile: song.audioFile,
        },
      });
    } catch (error) {
      console.error("Error uploading song:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

router.get("/all-songs", async (req, res) => {
  try {
    const songs = await songModel.find().select("-__v"); // fetch all, remove __v field
    if (songs.length === 0) {
      return res.status(404).json({ message: "No songs found" });
    }
    res.status(200).json(songs);
  } catch (error) {
    console.error("Error fetching all songs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


router.get("/mood-songs", async (req, res) => {
  try {
    const { mood } = req.query;
    if (!mood) {
      return res.status(400).json({ message: "Mood is required" });
    }
    const songs = await songModel.find({ mood }).select("-__v");
    if (songs.length === 0) {
      return res.status(404).json({ message: "No songs found for this mood" });
    }
    res.status(200).json(songs);
  } catch (error) {
    console.error("aa Error fetching songs by mood:", error);
    res.status(500).json({ message: "aa Internal server error" });
  }
})

export default router;
