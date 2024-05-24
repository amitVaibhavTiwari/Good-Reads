import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import { HiAdjustments } from "react-icons/hi";
import { customFetch } from "../../../Utils";

import SingleBook from "../../Components/SingleBook/SingleBook";
import Filters from "./Components/Filters";
import { PageChanger } from "../../Components/PageChanger/PageChanger";
import Button from "../../Components/Button/Button";
import ErrorToast from "../../Components/Toast/ErrorToast";
import AllBooksSkeleton from "../../Components/Skeletons/AllBooksSkeleton";

const AllBooks = () => {
  const [showFilters, setShowFilters] = useState(false);
  const location = useLocation();
  const qp = new URLSearchParams(location.search);

  const fetchBooks = async ({ pageParam }) => {
    let obj = {};
    qp.forEach((value, key) => {
      obj[key] = value;
    });

    try {
      const resp = await customFetch().get("api/v1/books/all", {
        params: {
          ...obj,
          page: pageParam,
          limit: 12,
        },
      });

      return resp.data;
    } catch (error) {
      console.log(error);
      toast.custom((t) => (
        <ErrorToast message={`Something went wrong`} toast={t} />
      ));
      return null;
    }
  };

  // fetch books func will be called inside useInfinteQuery
  const {
    data,
    status,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: [
      "all-books",
      qp.get("bookTitle") ?? "none",
      qp.get("bookGenre") ?? "none",
      qp.get("bookPrice") ?? "none",
      qp.get("bookRating") ?? "none",
    ],
    queryFn: fetchBooks,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.length > 0 ? allPages.length + 1 : undefined;
      return nextPage;
    },
  });

  // all books
  const content = data?.pages.map((e) =>
    e.map((book) => {
      return <SingleBook key={book._id} {...book} />;
    })
  );

  return (
    <PageChanger>
      <div className=" md:bg-lime-100 dark:bg-black">
        {/* below an extra div to adjust width */}
        <div className="max-w-[1280px] mx-auto flex px-2 gap-4 py-2 pb-4 lg:pb-7">
          <div
            onClick={() => setShowFilters(false)}
            className={`absolute w-screen top-0 bg-[#00000069] ${
              showFilters ? "left-[0]" : "left-[-2000px]"
            } transition-all ease-in-out delay-300 md:static md:w-fit md:bg-transparent`}
          >
            <Filters />
          </div>

          {/* below are all other things (other than filters) present on the right side of all books page. */}

          <div className=" min-h-[540px] h-screen overflow-y-scroll w-full px-2 py-5 md:px-6 md:py-8 bg-white hide-scroller rounded-3xl dark:bg-black">
            <div className="flex items-center justify-between mb-5 px-2">
              <h1 className="font-semibold text-2xl dark:text-white">
                All books
              </h1>
              <div
                onClick={() => setShowFilters(!showFilters)}
                className="text-xl p-2 bg-lime-500 text-white w-fit rounded-full md:hidden"
              >
                <HiAdjustments />
              </div>
            </div>

            {/* Books grid is below */}
            {status === "pending" && <AllBooksSkeleton />}
            {status === "error" && <h1>Error {error.message}</h1>}

            {/* Main grid containing all the books */}
            {
              <div className=" place-items-center grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1">
                {content}
              </div>
            }

            {isFetchingNextPage && (
              <div className="text-center mt-5 lg:mt-7 text-sm lg:text-base">
                Loading more books...
              </div>
            )}

            {hasNextPage ? (
              <div className="mt-5 lg:mt-7 w-fit mx-auto">
                <Button
                  title={"Load more"}
                  disabled={
                    status === "pending" || isFetchingNextPage || !hasNextPage
                  }
                  handleClick={() => fetchNextPage()}
                  key={"key"}
                />
              </div>
            ) : (
              <p className="text-center mt-5 lg:mt-7 text-sm lg:text-base dark:text-white">
                {data?.pages.flat().length
                  ? "No more books available"
                  : "Nothing matched to the search."}
              </p>
            )}
          </div>
        </div>
      </div>
    </PageChanger>
  );
};

export default AllBooks;
