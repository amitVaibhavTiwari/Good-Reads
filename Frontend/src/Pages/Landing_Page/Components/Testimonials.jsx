import { useEffect, useRef } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { register } from "swiper/element/bundle";
import { FaArrowRightLong } from "react-icons/fa6";
import { testimonials } from "../../../../Data";
register();

const Testimonials = () => {
  // below is some code for carousel copied from official swiper docs :-)
  const swiperRef = useRef(null);
  useEffect(() => {
    const swiperContainer = swiperRef.current;
    const params = {
      navigation: {
        nextEl: ".next-testimonial",
        prevEl: ".prev-testimonial",
      },
      slidesPerView: "1",
      spaceBetween: 2,

      loop: true,

      autoplay: {
        delay: 5000,
      },
      speed: 600,

      injectStyles: [
        ` .swiper-button-next,
          .swiper-button-prev {
       
           display:none;
          }
       
          }
          `,
      ],
    };
    Object.assign(swiperContainer, params);
    swiperContainer.initialize();
  }, []);

  return (
    <>
      <div className="px-4 py-10 md:py-14 dark:bg-[#14251c] dark:text-white">
        <h2 className="text-3xl text-center lg:text-4xl dark:text-green-600">
          See what people say about us
        </h2>
        <div className="mt-6 lg:mt-12">
          <swiper-container ref={swiperRef} init="false">
            {testimonials.map((testimonial, i) => {
              return (
                <swiper-slide key={i}>
                  <div className="border-[1px] rounded-xl border-black dark:border-green-500 p-4 text-center w-10/12 mx-auto md:w-3/5 md:px-6 md:py-8 lg:p-10 max-w-[730px] ">
                    <p className="text-sm lg:text-base">{testimonial.review}</p>
                    <h1 className="text-md font-semibold mt-5 lg:text-lg dark:text-green-500">
                      {testimonial.reviewer}
                    </h1>
                    <h1 className="text-sm lg:text-base">
                      {testimonial.designation}
                    </h1>
                  </div>
                </swiper-slide>
              );
            })}
          </swiper-container>

          {/* next and prev buttons */}
          <div className="mt-8 mx-auto w-fit flex gap-3">
            <button className="prev-testimonial rounded-lg p-2 text-lg border-[1px] border-black dark:border-green-500 hover:bg-lime-950 hover:text-white">
              <FaArrowLeft />
            </button>
            <button className="next-testimonial rounded-lg p-2 text-lg border-[1px] border-black dark:border-green-500 hover:bg-lime-950 hover:text-white">
              <FaArrowRightLong />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimonials;
