import { useState } from "react";
import { Form } from "react-router-dom";
import Button from "../../../Components/Button/Button";
import FillButton from "../../../Components/Button/FillButton";
import FormInput from "../../../Components/FormInput/FormInput";
import RangeInput from "../../../Components/RangeInput/RangeInput";
import SelectInput from "../../../Components/SelectInput/SelectInput";

const Filters = () => {
  // set values in filters so that if someone refereshes the page, filters will remail same on frontend
  const qp = new URLSearchParams(window.location.search);
  const [maxPrice, setMaxPrice] = useState(qp.get("bookPrice") || 10000);
  const [rating, setRating] = useState(qp.get("bookRating") || 0);

  return (
    <div className="px-6 py-5 w-[290px] h-screen overflow-y-scroll md:rounded-3xl md:w-[280px] md:px-6 md:py-8 lg:w-[320px] bg-white hide-scroller dark:bg-zinc-900 dark:text-white">
      <h1 className="text-2xl font-semibold  mx-auto w-fit md:text-left lg:text-3xl dark:text-green-700  ">
        Filters
      </h1>
      <h1 className="text-sm text-center mb-10 mx-auto w-fit  lg:text-base lg:mb-8 dark:text-white">
        Search by what matters the most
      </h1>
      <Form className="flex flex-col gap-8 lg:gap-6">
        <FormInput
          fieldName={"bookTitle"}
          inputType={"text"}
          title={"Search by book title"}
          key={"1"}
          value={qp.get("bookTitle")}
        />

        <RangeInput
          fieldName={"bookPrice"}
          title={"Max price"}
          key={"3"}
          maxValue={10000}
          step={10}
          value={maxPrice}
          setValue={setMaxPrice}
        />
        <RangeInput
          fieldName={"bookRating"}
          inputType={"text"}
          title={"Minimum rated"}
          key={"4"}
          maxValue={5}
          step={0.1}
          value={rating}
          setValue={setRating}
        />

        <SelectInput
          fieldName={"bookGenre"}
          title={"Search by book genre"}
          key={"6"}
          value={qp.get("bookGenre")}
        >
          <option value={""}>All</option>
          <option value={"non-fiction"}>Non-fiction</option>
          <option value={"fiction"}>Fiction</option>
          <option value={"novel"}>Novel</option>
          <option value={"thriller"}>Thriller</option>
          <option value={"romance"}>Romance</option>
        </SelectInput>

        <div className="mt-6 flex items-center gap-2 w-fit ml-auto lg:mt-10">
          <FillButton type={"submit"} title={"Apply filters"} />
          <Button title={"Reset"} />
        </div>
      </Form>
    </div>
  );
};

export default Filters;
