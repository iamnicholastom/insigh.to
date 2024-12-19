import mongoose from "mongoose";

const BoardSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
});

const Board = mongoose.model("Board", BoardSchema);

export default mongoose.models.Board || Board;
