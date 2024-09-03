import mongoose from "mongoose";

const User = new mongoose.Schema({
    username: { type: String, require: true },
    score: { type: Number },
});

export default mongoose.models.User || mongoose.model("User", User);
