import mongoose from "mongoose";
const booksSchema = new mongoose.Schema(
  {
    bookTitle: {
      type: String,
      required: true,
    },
    bookAuthor: {
      type: String,
      required: true,
    },
    bookPrice: {
      type: Number,
      required: true,
    },
    bookRating: {
      type: String,
      required: true,
    },
    bookLastPublished: {
      type: Date,
      required: true,
    },
    bookDescription: {
      type: String,
      required: true,
    },
    bookGenre: {
      type: String,
      required: true,
      enum: ["thriller", "romance", "fiction", "non-fiction", "novel"],
    },
    ownerId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const bookModel = mongoose.model("Books", booksSchema);

export default bookModel;
