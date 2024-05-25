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
      return res.status(200).json({ book: book, found: true });
    } else {
      res.status(404).json({ message: "no book found", found: false });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, found: false });
  }
};

//
//
//
// complicated one! read carefully to understand.
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

  // We'll not send all the fields of every book. We'll only send following fields.
  const fields = ["bookTitle", "bookPrice", "bookRating", "bookAuthor"];

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

  let result = bookModel.find(queryObj, fields).sort({ createdAt: -1 });

  const pageNo = Number(page) || 1;
  const vehicleLimit = Number(limit) || 5;
  const skip = (pageNo - 1) * vehicleLimit;
  result = result.skip(skip).limit(limit);

  try {
    const books = await result;
    return res.status(200).send(books);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//
//
//
//
//
export const editBook = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await bookModel.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found", edited: false });
    }

    // checking that if book owner is editing the book na.
    if (book.ownerId != req.userId) {
      return res.status(403).json({
        message: "You are not allowed to edit this book",
        edited: false,
      });
    }

    // ---IMPORTANT---
    // I'm going to edit the book using a for loop appraoach. I know there are methods to directly update the book but that way all the checks on book schema will be ignored and this way no checks are ignored, that's why i prefer this method.

    const keys = Object.keys(req.body);
    const values = Object.values(req.body);

    //  updating every field one by one and saving it.
    for (let i = 0; i < keys.length; i++) {
      let field = keys[i];
      book[field] = values[i];
      await book.save();
    }
    return res
      .status(200)
      .json({ message: "Book updated succesfully", edited: true });
  } catch (error) {
    res.status(500).json({ message: error.message, edited: false });
  }
};
//
//
//
//
// To get books uploaded by a user

export const getUserBooks = async (req, res) => {
  // We'll not send all the fields of every book. We'll only send following fields.
  const fields = ["bookTitle", "bookPrice", "bookRating", "bookAuthor"];

  try {
    const resp = await bookModel
      .find({ ownerId: req.userId }, fields)
      .sort({ createdAt: -1 });
    if (resp) {
      return res.status(200).json({ books: resp, found: true });
    }
    if (!resp) {
      return res.status(404).json({ message: "No books found", found: false });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, found: false });
  }
};

//
//
//
//
export const deleteBook = async (req, res) => {
  const { id } = req.params;

  try {
    const book = await bookModel.findById(id);
    if (!book) {
      return res
        .status(404)
        .json({ message: "Book not found", deleted: false });
    }

    // checking that if book owner is deleting the book na.
    if (book.ownerId != req.userId) {
      return res.status(403).json({
        message: "You are not allowed to delete this book",
        deleted: false,
      });
    }

    await bookModel.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ message: "Book deleted succesfully", deleted: true });
  } catch (error) {
    res.status(500).json({ message: error.message, deleted: false });
  }
};
