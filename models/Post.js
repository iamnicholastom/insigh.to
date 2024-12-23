import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true,
    maxlength: 100,
  },
  description: {
    type: String,
    trim: true,
    maxlength: 1000,
  },
  boardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Board",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
