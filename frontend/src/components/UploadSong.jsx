import axios from "axios";
import { useState } from "react";

export default function UploadSong() {
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    mood: "",
  });
  const [coverImage, setCoverImage] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setCoverImage(file);
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleAudioChange = (e) => {
    setAudioFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    const data = new FormData();
    data.append("title", formData.title);
    data.append("artist", formData.artist);
    data.append("mood", formData.mood);
    data.append("coverImage", coverImage);
    data.append("audioFile", audioFile);

    try {
      const res = await axios.post("http://localhost:8080/songs/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage(res.data.message);
      setFormData({ title: "", artist: "", mood: "" });
      setCoverImage(null);
      setAudioFile(null);
      setPreviewImage(null);
    } catch (error) {
      setMessage(error.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-[#181818] rounded-2xl shadow-lg p-8 w-full max-w-lg border border-gray-800"
      >
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          🎵 Upload a New Song
        </h2>

        {/* Cover Image Preview */}
        <div className="flex justify-center mb-6">
          {previewImage ? (
            <img
              src={previewImage}
              alt="Cover Preview"
              className="w-32 h-32 object-cover rounded-lg shadow-md"
            />
          ) : (
            <div className="w-32 h-32 bg-gray-800 rounded-lg flex items-center justify-center text-gray-500">
              No Image
            </div>
          )}
        </div>

        {/* Title */}
        <input
          type="text"
          name="title"
          placeholder="Song Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />

        {/* Artist */}
        <input
          type="text"
          name="artist"
          placeholder="Artist Name"
          value={formData.artist}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />

        {/* Mood */}
        <select
          name="mood"
          value={formData.mood}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        >
          <option value="">Select Mood</option>
          <option value="happy">happy</option>
          <option value="sad">sad</option>
          <option value="excited">excited</option>
          <option value="romantic">neutral</option>
        </select>

        {/* Cover Image Upload */}
        <label className="block mb-4">
          <span className="text-gray-400">Cover Image</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-2 block w-full text-gray-300 file:mr-4 file:py-2 file:px-4
                       file:rounded-full file:border-0
                       file:text-sm file:font-semibold
                       file:bg-green-500 file:text-white
                       hover:file:bg-green-600"
            required
          />
        </label>

        {/* Audio Upload */}
        <label className="block mb-6">
          <span className="text-gray-400">Audio File</span>
          <input
            type="file"
            accept="audio/*"
            onChange={handleAudioChange}
            className="mt-2 block w-full text-gray-300 file:mr-4 file:py-2 file:px-4
                       file:rounded-full file:border-0
                       file:text-sm file:font-semibold
                       file:bg-blue-500 file:text-white
                       hover:file:bg-blue-600"
            required
          />
        </label>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition"
        >
          {loading ? "Uploading..." : "Upload Song"}
        </button>

        {/* Message */}
        {message && (
          <p className="text-center mt-4 text-gray-300">{message}</p>
        )}
      </form>
    </div>
  );
}
