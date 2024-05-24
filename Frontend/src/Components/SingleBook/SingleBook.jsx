import PropTypes from "prop-types";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SingleBook = ({ bookTitle, bookRating, bookPrice, bookAuthor, _id }) => {
  const navigate = useNavigate();

  return (
    <div className="border-2 border-black p-2 bg-white rounded-2xl w-full animate-wiggle dark:bg-transparent dark:border-green-700">
      {/* we're using a div instead of book's image */}
      <div className="h-28 grid place-items-center md:h-32 lg:h-36 bg-slate-500 dark:bg-slate-700">
        -Book-
      </div>

      <h1 className="mt-3 font-semibold text-sm lg:text-base dark:text-green-700">
        {bookTitle}
      </h1>
      <p className="text-xs mt-1 lg:text-sm dark:text-white">{bookAuthor}</p>
      <div className="flex items-center gap-1 text-sm">
        <div>
          <FaStar className="text-yellow-500" />
        </div>
        <div className="text-xs lg:text-sm dark:text-white"> {bookRating}</div>
      </div>
      <div className="flex items-center justify-between mt-1">
        <p className="text-sm lg:text-sm dark:text-white"> {bookPrice + "₹"}</p>
        <button
          onClick={() => navigate(`/all/${_id}`)}
          className="px-3 py-2 text-lime-950 font-semibold border-[1px] border-lime-950  rounded-3xl text-xs hover:text-white hover:font-normal hover:bg-[#3f6212] lg:text-sm dark:border-green-700 dark:hover:bg-green-200 dark:text-green-700"
        >
          View more
        </button>
      </div>
    </div>
  );
};

SingleBook.propTypes = {
  bookTitle: PropTypes.string.isRequired,
  bookRating: PropTypes.string.isRequired,
  bookAuthor: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  bookPrice: PropTypes.number.isRequired,
};

export default SingleBook;
