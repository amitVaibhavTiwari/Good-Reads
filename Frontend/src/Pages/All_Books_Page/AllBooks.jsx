import SingleBook from "../../Components/SingleBook/SingleBook";
import { HiAdjustments } from "react-icons/hi";

import Filters from "./Components/Filters";
import { useState } from "react";
import { PageChanger } from "../../Components/PageChanger/PageChanger";
import { customFetch } from "../../../Utils";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

const AllBooks = () => {
  const [showFilters, setShowFilters] = useState(false);
  const location = useLocation();
  const arr = new Array(15);
  const qp = new URLSearchParams(location.search);

  const getAllBooks = async () => {
    let obj = {};
    qp.forEach((value, key) => {
      obj[key] = value;
    });

    try {
      const resp = await customFetch().get("api/v1/books/all", {
        params: {
          ...obj,
          page: 1,
          limit: 10,
        },
      });
      return resp.data;
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["getallbooks"],
    queryFn: getAllBooks,
  });

  return (
    <PageChanger>
      {console.log(data)}
      <div className=" md:bg-lime-100">
        {/* below an extra div to adjust width */}
        <div className="max-w-[1280px] mx-auto flex px-2 gap-4">
          <div
            onClick={() => setShowFilters(false)}
            className={`absolute w-screen top-0 bg-[#00000069] ${
              showFilters ? "left-[0]" : "left-[-2000px]"
            } transition-all ease-in-out delay-300 md:static md:w-fit md:bg-transparent`}
          >
            <Filters />
          </div>

          {/* below are all other things (other than filters) present on the right side of all books page. */}

          <div className=" min-h-[540px] h-screen overflow-y-scroll w-full px-2 py-5 md:px-6 md:py-8 bg-white hide-scroller rounded-3xl">
            <div className="flex items-center justify-between mb-5 px-2">
              <h1 className="font-semibold text-2xl">All books</h1>
              <div
                onClick={() => setShowFilters(!showFilters)}
                className="text-xl p-2 bg-lime-500 text-white w-fit rounded-full md:hidden"
              >
                <HiAdjustments />
              </div>
            </div>

            {/* Books grid is below */}
            {isLoading && <p>Loading books...</p>}
            {error && <p>Error: {error.message}</p>}

            {/* Main grid containing all the books */}
            {!isLoading && !isLoading && (
              <div className=" place-items-center grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1">
                {[...arr].map((book, i) => {
                  return <SingleBook key={i} />;
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </PageChanger>
  );
};

export default AllBooks;
