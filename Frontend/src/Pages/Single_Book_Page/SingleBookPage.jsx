import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useGlobalContext } from "../../GlobalContext";
import { customFetch } from "../../../Utils";
import { FaStar } from "react-icons/fa6";
import toast from "react-hot-toast";
import dayjs from "dayjs";

import Button from "../../Components/Button/Button";
import SuccessToast from "../../Components/Toast/SuccessToast";
import ErrorToast from "../../Components/Toast/ErrorToast";
import SingleBookSkeleton from "../../Components/Skeletons/SingleBookSkeleton";

const SingleBookPage = () => {
  const { id } = useParams();
  const { currentlyLoggedInUser } = useGlobalContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Function to load book data
  const getSingleBook = async () => {
    try {
      const resp = await customFetch().get(`api/v1/books/get/${id}`);
      return resp.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  const { data, error, status } = useQuery({
    queryKey: ["singleBook", id],
    queryFn: getSingleBook,
  });

  // Below is function to delete book
  const handleDeleteBook = async () => {
    try {
      const resp = await customFetch().delete(`api/v1/books/delete/${id}`, {
        withCredentials: true,
      });
      return resp.data;
    } catch (error) {
      console.log(error);
      toast.custom((t) => (
        <ErrorToast message={`Something went wrong.`} toast={t} />
      ));
      return;
    }
  };
  const { mutate, isPending } = useMutation({
    mutationFn: handleDeleteBook,
    onSuccess: async (data) => {
      if (data.deleted === true) {
        // removing all queries so that react-query refetches all the books and user can see the edited book.
        queryClient.removeQueries();
        toast.custom((t) => (
          <SuccessToast message={`Book deleted succesfully`} toast={t} />
        ));
        navigate(-1);
      }
    },
  });

  if (status === "pending") return <SingleBookSkeleton />;
  if (status === "error") return <h1>Error {error.message}</h1>;

  if (data?.found == true) {
    return (
      <div className="px-4 py-6 md:py-14 fit-width dark:bg-black dark:text-white">
        <div className="flex flex-col gap-7 md:flex-row justify-between md:items-start">
          {/* this below div is used as book image */}
          <div className="bg-slate-500 dark:bg-slate-800 h-96 w-11/12 mx-auto grid place-items-center max-w-[320px] md:basis-1/2 md:h-[26rem] md:max-w-[400px] md:mx-0">
            -Book-
          </div>

          {/* book details */}
          <div className="md:basis-1/2">
            <h1 className="text-lg font-semibold lg:text-2xl dark:text-green-700">
              {data.book.bookTitle}
            </h1>
            <h2 className="text-base font-light lg:text-xl">
              {data.book.bookAuthor}
            </h2>
            <h3 className="text-base mt-2">{data.book.bookPrice}₹</h3>
            <div className="flex items-center mt-1 gap-1 lg:mt-2">
              <FaStar className="text-yellow-500" />
              <div className="text-xs lg:text-base">{data.book.bookRating}</div>
            </div>
            <p className="mt-4 text-base lg:text-lg">
              {data.book.bookDescription}
            </p>
            <div className="mt-6 font-semibold text-base lg:text-lg lg:mt-8 dark:text-green-700">
              Category:
              <span className="font-light dark:text-white">
                {" "}
                {data.book.bookGenre}
              </span>
            </div>
            <div className="mt-2 font-semibold text-base lg:text-lg lg:mt-4 dark:text-green-700">
              Last published:
              <span className="font-light dark:text-white">
                {" "}
                {dayjs(data.book.bookLastPublished).format("DD-MM-YYYY")}
              </span>
            </div>

            <div className="mt-8 lg:mt-10">
              {data.book.ownerId == currentlyLoggedInUser?.userId ? (
                <div className="flex gap-2">
                  <Button
                    disabled={isPending}
                    handleClick={() => navigate(`/edit/${data.book._id}`)}
                    title={"Edit"}
                  />
                  <button
                    disabled={isPending}
                    onClick={() => mutate()}
                    className="px-4 py-2 text-white bg-red-600 rounded-3xl text-sm hover:bg-red-800 "
                  >
                    Delete book
                  </button>
                </div>
              ) : (
                <Button title={"Add to cart"} />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default SingleBookPage;
