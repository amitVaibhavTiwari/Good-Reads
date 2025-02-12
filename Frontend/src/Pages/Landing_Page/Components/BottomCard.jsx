import { useNavigate } from "react-router-dom";
import FillButton from "../../../Components/Button/FillButton";

const BottomCard = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-lime-100 text-center px-4 py-8 md:px-24 md:py-14 lg:py-20 fit-width dark:bg-black">
      <p className="text-xl font-semibold leading-6 lg:text-3xl dark:text-white ">
        Get started with goodreads today and discover the joy of reading with a
        community of book lovers.
      </p>
      <p className="text-sm mt-4 lg:text-base dark:text-green-700">
        goodreads is the world's largest book community, with over 15 million
        members. It's a great place to discover new books, track your reading
        process and connect with other readers who share your love of reading.
      </p>
      <div className="mt-5">
        <FillButton title={"See books"} handleClick={() => navigate("/all")} />
      </div>
    </div>
  );
};

export default BottomCard;
