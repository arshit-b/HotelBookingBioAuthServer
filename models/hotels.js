import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  name: String,
  location: String,
  price: Number,
  selectedFile: String,
  details: String,
  rating: Number,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

var PostMessage = mongoose.model("hotels", postSchema);

export default PostMessage;
