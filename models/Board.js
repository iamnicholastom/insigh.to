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

export default mongoose.models.Board || mongoose.model("Board", BoardSchema);
