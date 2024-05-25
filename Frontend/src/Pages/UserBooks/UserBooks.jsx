import { PageChanger } from "../../Components/PageChanger/PageChanger";
import AllBooksSkeleton from "../../Components/Skeletons/AllBooksSkeleton";
import { useGlobalContext } from "../../GlobalContext";
import { customFetch } from "../../../Utils";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import SingleBook from "../../Components/SingleBook/SingleBook";

const UserBooks = () => {
  const { currentlyLoggedInUser } = useGlobalContext();
  const [isError, setIsError] = useState();

  // Function to load all books
  const getUserBooks = async () => {
    try {
      const resp = await customFetch().get(`api/v1/books/user/books`, {
        withCredentials: true,
      });
      return resp.data;
    } catch (error) {
      setIsError(error?.response?.data?.message || "Something went wrong");
      console.log(error);
      return null;
    }
  };
  const { data, status } = useQuery({
    queryKey: ["userBooks"],
    queryFn: getUserBooks,
  });
  return (
    <PageChanger>
      <div className="px-4 py-6 fit-width dark:bg-black dark:text-white">
        <h1 className="text-3xl font-semibold mb-1 lg:text-4xl lg:mb-2 ">
          Hey,{" "}
          <span className="text-base lg:text-lg dark:text-green-700">
            {currentlyLoggedInUser.userName}
          </span>
        </h1>
        <h1 className="text-xl font-medium mb-3 lg:text-2xl lg:mb-5 ">
          Your books
        </h1>

        {/* books grid below */}
        <div className="md:max-w-[768px] lg:max-w-[1000px] mx-auto min-h-screen">
          {status === "pending" && <AllBooksSkeleton />}
          {status === "error" && <p className="text-red-500">{isError}</p>}
          {data?.books.length == 0 && (
            <p>
              Books you upload will be visible here. No books uploaded by you.
            </p>
          )}

          {/* Main books grid containing all books*/}
          <div className="place-items-center grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1">
            {data?.books.map((book) => {
              return <SingleBook key={book._id} {...book} />;
            })}
          </div>
        </div>
      </div>
    </PageChanger>
  );
};

export default UserBooks;
