import { config } from "dotenv";
import app from "./src/app.js";
import connectDB from "./src/db/db.js";
config();

const PORT = process.env.PORT || 3000;


app.get("/", (req, res) => {
    res.send("Welcome to the Song Player API");
});

connectDB();
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});