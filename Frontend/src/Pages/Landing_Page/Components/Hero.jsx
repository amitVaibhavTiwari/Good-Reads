import Button from "../../../Components/Button/Button";
import FillButton from "../../../Components/Button/FillButton";

const Hero = () => {
  return (
    <div className="p-4 pb-10 bg-lime-100 flex flex-col gap-8 md:flex-row md:py-14 lg:items-center lg:justify-between fit-width">
      {/* hero image */}
      <div className="md:order-2 md:basis-1/2">
        <img
          className="rounded-3xl h-80 w-11/12 ml-auto md:m-0 md:w-full lg:h-96 lg:max-w-[500px]"
          src="/pexels-cottonbro-6344238.jpg"
          alt="Hero image"
        />
      </div>

      {/* Hero text */}
      <div className="md:basis-1/2">
        <h1 className="text-3xl font-semibold lg:text-5xl lg:leading-[3.5rem]">
          The World's largest book community
        </h1>
        <p className="mt-2 text-[.95rem] lg:text-lg">
          With a staggering collection of over 50 million books at your
          disposal, there's an excellent chance thaat you'll uncover a literary
          treasure perfectly tailored to your taste and preference.{" "}
        </p>

        <input
          placeholder="Search for books"
          className="mt-8 p-1 w-72 border-2 border-slate-300 rounded-md"
          type="text"
        />

        <div className="mt-6 flex gap-3">
          <FillButton title={"Join for free"} />
          <Button title={"Browse books"} />
        </div>
      </div>
    </div>
  );
};

export default Hero;
