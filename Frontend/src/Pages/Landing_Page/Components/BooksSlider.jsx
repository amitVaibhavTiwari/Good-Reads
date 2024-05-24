import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "swiper/element/bundle";
import { useQuery } from "@tanstack/react-query";
import { FaArrowRight } from "react-icons/fa6";
import { customFetch } from "../../../../Utils";

import SingleBook from "../../../Components/SingleBook/SingleBook";

register();

const BookSlider = () => {
  const arr = new Array(15);
  const navigate = useNavigate();

  // Below is some code for carousel, copied form official swiper docs :-)

  const swiperRef = useRef(null);
  useEffect(() => {
    const swiperContainer = swiperRef.current;
    const params = {
      navigation: true,
      spaceBetween: "1",
      pagination: false,
      slidesPerView: "2.1",
      breakpoints: {
        // if u r using breakpints then make sure that, every property you are defining inside the breakPoints should be defined for every breakpoint otherwise it will get back to its initial value
        450: {
          slidesPerView: 2.7,
          slidesPerGroup: 2,
          spaceBetween: "2",
        },

        768: {
          slidesPerView: 4,
          slidesPerGroup: 2,
          spaceBetween: "3",
        },
        1024: {
          slidesPerView: 5,
          slidesPerGroup: 3,
          spaceBetween: "8",
        },
        1280: {
          slidesPerView: 5.5,
          slidesPerGroup: 3,
          spaceBetween: "8",
        },
      },

      autoplay: false,

      injectStyles: [
        ` .swiper-button-next,
            .swiper-button-prev {
             background-color:#365314;
             color:white;
             padding:.5rem;
             height:.95rem;
             width:.95rem;
             border-radius:50%;
             visibility:hidden;
            }
            @media(min-width:1024px){
              .swiper-button-next,
              .swiper-button-prev {
                visibility:visible;
              }
            }
            `,
      ],
    };
    Object.assign(swiperContainer, params);
    swiperContainer.initialize();
  }, []);

  //
  //
  //
  // below is the function to fetch some books to show in carousel
  const fetchBooks = async () => {
    try {
      const resp = await customFetch().get("api/v1/books/all", {
        params: {
          page: 1,
          limit: 15,
        },
      });

      return resp.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const { data, error, status } = useQuery({
    queryKey: ["getallbooks"],
    queryFn: fetchBooks,
  });

  return (
    <>
      <div className="px-4 py-10 md:py-14 bg-lime-100 dark:bg-black dark:text-green-700">
        <div className=" max-w-[1280px] mx-auto">
          <div className="flex items-center justify-between mb-6">
            <p className="flex items-center gap-1 text-xl lg:text-2xl">
              Popular books <FaArrowRight />
            </p>
            <p
              onClick={() => navigate("/all")}
              className="flex items-center gap-1 text-sm lg:text-lg cursor-pointer hover:underline"
            >
              See all <FaArrowRight />
            </p>
          </div>

          {status === "error" && <h1>Error {error.message}</h1>}

          {/* below is swiper container which should contain all the slides to show in carousel. If our data is loading, we'll show slides with loading skeleton and when data is loaded we'll show real book slides. */}
          <swiper-container ref={swiperRef} init="false">
            {status === "pending" &&
              [...arr].map((e, i) => {
                return (
                  <swiper-slide key={i}>
                    <div className="h-32 md:h-44 lg:h-56 bg-slate-400 rounded-2xl w-full animate-pulse"></div>
                  </swiper-slide>
                );
              })}

            {status === "success" &&
              data.map((book, i) => {
                return (
                  <swiper-slide key={i}>
                    <SingleBook {...book} />
                  </swiper-slide>
                );
              })}
          </swiper-container>
        </div>
      </div>
    </>
  );
};

export default BookSlider;
