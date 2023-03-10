import mongoose from "mongoose";


const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: "title of blog is missing"
  },
  category: {
      type:String,
      required:"Category of blog is missing"
  },
  image: {
      type:String,
      required:"Image of blog is missing"
  },
  description: {
    type: String,
    required: "Description of blog is missing"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Blog = mongoose.model("Blog", blogSchema)

export default Blog