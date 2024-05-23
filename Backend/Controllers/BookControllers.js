import bookModel from "../Models/BookModel.js";

export const addBook = async (req, res) => {
  try {
    const newBook = {
      ...req.body,
      ownerId: req.userId,
    };
    await bookModel.create(newBook);
    res
      .status(201)
      .json({ message: "New book added successfully", created: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message, created: false });
  }
};
//
//
//
//
//
export const getBook = async (req, res) => {
  try {
    const book = await bookModel.findById(req.params.id);
    if (book) {
      res.status(200).json({ book: book, found: true });
    } else {
      res.status(404).json({ message: "no book found", found: false });
    }
  } catch (error) {
    res.status(500).json({ message: err.message, found: false });
  }
};

//
//
//
//
//
export const getAllBooks = async (req, res) => {
  const { bookTitle, bookPrice, bookRating, bookGenre, page, limit } =
    req.query;

  // This function removes commas from a string
  const convertString = function (value) {
    try {
      return new Function("return " + value + ";")();
    } catch (e) {
      return value;
    }
  };

  const queryObj = {};

  if (bookTitle) {
    queryObj.bookTitle = { $regex: bookTitle, $options: "i" };
  }

  if (bookGenre) {
    queryObj.bookGenre = bookGenre;
  }

  if (bookPrice) {
    queryObj.bookPrice = { $lt: parseInt(bookPrice) };
  }

  if (bookRating) {
    queryObj.bookRating = { $gt: convertString(bookRating) };
  }

  console.log(queryObj);
  let result = bookModel.find(queryObj).sort({ createdAt: -1 });
  const pageNo = Number(page) || 1;
  const vehicleLimit = Number(limit) || 5;
  const skip = (pageNo - 1) * vehicleLimit;
  result = result.skip(skip).limit(limit);
  try {
    const books = await result;

    res.status(200).json({ books: books, booksLength: books.length });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
