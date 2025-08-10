import ImageKit from "imagekit";
import dotenv from "dotenv";
dotenv.config();
var imagekit = new ImageKit({
    publicKey : process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint : process.env.IMAGEKIT_URL_ENDPOINT
});

export const uploadImage = async (file) => {
    try {
        const response = await imagekit.upload({
            file: file,
            fileName: "song-image-" + Date.now(),
            folder: "images"
        });
        return response;
    } catch (error) {
        console.error("Error uploading image:", error);
        throw error;
    }
}

export const uploadAudio = async (file) => {
    try {
        const response = await imagekit.upload({
            file: file,
            fileName: "song-audio-" + Date.now(),
            folder: "songs"
        });
        return response;
    } catch (error) {
        console.error("Error uploading audio:", error);
        throw error;
    }
}