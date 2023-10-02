import mongoose from "mongoose";

const threadSchema = new mongoose.Schema(
  {
    text: {
      type: String,
    },
    img: {
      type: String,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    parentId: {
      type: String,
    },
    children: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Thread",
      },
    ],
  },
  { timestamps: true }
);

const Thread = mongoose.models.Thread || mongoose.model("Thread", threadSchema);

export default Thread;