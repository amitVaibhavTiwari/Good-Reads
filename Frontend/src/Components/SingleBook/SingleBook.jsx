import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../GlobalContext";
const SingleBook = () => {
  const navigate = useNavigate();
  const { currentlyLoggedInUser } = useGlobalContext();
  return (
    <div className="border-2 border-black p-2 bg-white rounded-2xl w-full">
      {/* we're using a div instead of book's image */}
      <div
        onClick={() => console.log(currentlyLoggedInUser)}
        className="h-28 grid place-items-center md:h-32 lg:h-36 bg-slate-500"
      >
        -Book-
      </div>

      <h1 className="mt-3 font-semibold text-sm lg:text-base">
        Water for elephants
      </h1>
      <p className="text-xs mt-1 lg:text-sm">Vince Gilligan</p>
      <div className="flex items-center gap-1 text-sm">
        <div>
          <FaStar className="text-yellow-500" />
        </div>
        <div className="text-xs lg:text-sm">4.3</div>
      </div>
      <div className="flex items-center justify-between mt-1">
        <p className="text-sm lg:text-sm">₹435</p>
        <button
          onClick={() => navigate("/all/2222222")}
          className="px-3 py-2 text-lime-950 font-semibold border-[1px] border-lime-950  rounded-3xl text-xs hover:text-white hover:font-normal hover:bg-[#3f6212] lg:text-sm "
        >
          View more
        </button>
      </div>
    </div>
  );
};

export default SingleBook;
