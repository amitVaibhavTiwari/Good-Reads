import { FaStar } from "react-icons/fa6";
import { PageChanger } from "../../Components/PageChanger/PageChanger";
import Button from "../../Components/Button/Button";

const SingleBookPage = () => {
  
  return (
    <PageChanger>
      <div className="px-4 py-6 md:py-14 fit-width">
        <div className="flex flex-col gap-7 md:flex-row justify-between md:items-start">
          {/* this below div is used as book image */}
          <div className="bg-slate-500 h-96 w-11/12 mx-auto grid place-items-center max-w-[320px] md:basis-1/2 md:h-[26rem] md:max-w-[400px] md:mx-0">
            -Book-
          </div>
          {/* book details */}
          <div className="md:basis-1/2">
            <h1 className="text-lg font-semibold lg:text-2xl">
              Water for elephants
            </h1>
            <h2 className="text-base font-light lg:text-xl">Vince Gilligan</h2>
            <h3 className="text-base mt-2">₹435</h3>
            <div className="flex items-center mt-1 gap-1 lg:mt-2">
              <FaStar className="text-yellow-500" />
              <div className="text-xs lg:text-base">4.3</div>
            </div>
            <p className="mt-4 text-base lg:text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic esse
              illo expedita sapiente quasi veritatis delectus a molestiae
              voluptatibus. Provident id debitis delectus eveniet dignissimos
              molestias officiis necessitatibus veritatis? Nesciunt! lorem40
            </p>
            <div className="mt-6 font-semibold text-base lg:text-lg lg:mt-8">
              Category:
              <span className="font-light"> Non-Fiction</span>
            </div>
            <div className="mt-2 font-semibold text-base lg:text-lg lg:mt-4">
              Last published:
              <span className="font-light"> 1999</span>
            </div>

            <div className="mt-8 lg:mt-10">
              <Button title={"Add to cart"} />
            </div>
          </div>
        </div>
      </div>
    </PageChanger>
  );
};

export default SingleBookPage;
