import Button from "../../../Components/Button/Button";
import FillButton from "../../../Components/Button/FillButton";
const CardSection2 = () => {
  return (
    <div className="p-4 pb-10 flex flex-col gap-8 md:flex-row md:py-14 md:items-center lg:py-16 fit-width">
      {/* Card image */}
      <div className="md:basis-2/5">
        <img
          className="rounded-3xl h-80 md:h-96 lg:max-w-[420px]"
          src="/pexels-cottonbro-6334576.jpg"
          alt="Hero image"
        />
      </div>

      {/* Card text */}
      <div className="md:basis-3/5">
        <h1 className="text-2xl font-semibold lg:text-4xl lg:leading-[2.7rem]">
          Best way to discover, track and share your reading life.
        </h1>
        <p className="mt-2 text-[.95rem] lg:text-lg lg:mt-4">
          From discovering new books to tracking your reading progress to
          connecting with other readers, Goodreads has everything you need to
          manage your reading life. Books to tracking your reading progress.
        </p>

        <div className="mt-8 ">
          <FillButton title={"Join for free"} />
        </div>
      </div>
    </div>
  );
};

export default CardSection2;
