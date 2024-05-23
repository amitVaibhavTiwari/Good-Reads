import { useEffect, useRef } from "react";
import { register } from "swiper/element/bundle";
import { FaArrowRight } from "react-icons/fa6";

// import Button from "../../Reusable-Components/Button/Button";
// import { FaLocationDot } from "react-icons/fa6";
import SingleBook from "../../../Components/SingleBook/SingleBook";
import { useNavigate } from "react-router-dom";

register();

const BookSlider = () => {
  const swiperRef = useRef(null);
  useEffect(() => {
    const swiperContainer = swiperRef.current;
    const params = {
      navigation: true,
      spaceBetween: "1",
      pagination: false,
      slidesPerView: "2.1",
      breakpoints: {
        // if u r using breakpints then make sure that , every property you are defining inside the breakPoints should be defined for every breakpoint otherwise it will get back to its initial value

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

  const arr = new Array(15);
  const navigate = useNavigate();
  return (
    <>
      <div className="px-4 py-10 md:py-14 bg-lime-100">
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
          <swiper-container ref={swiperRef} init="false">
            {[...arr].map((book, i) => {
              return (
                <swiper-slide key={i}>
                  <SingleBook />
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
