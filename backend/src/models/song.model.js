import { model, Schema } from "mongoose";

const songSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true, 
        trim: true,
        maxlength: 100,
    },
    artist: {
        type: String,
        required: true,
    },
    mood: {
        type: String,
        required: true,
    },
    coverImage: {
        type: String,
        required: true,
    },
    audioFile: {
        type: String,
        required: true,
    },
});
const Song = model("Song",songSchema); 

export default Song;