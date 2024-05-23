import { Form } from "react-router-dom";
import Button from "../../../Components/Button/Button";
import FillButton from "../../../Components/Button/FillButton";
import FormInput from "../../../Components/FormInput/FormInput";
import RangeInput from "../../../Components/RangeInput/RangeInput";
import SelectInput from "../../../Components/SelectInput/SelectInput";

const Filters = () => {
  const isPending = false;
  return (
    <div className="px-6 py-5 w-[290px] h-screen overflow-y-scroll md:rounded-3xl md:w-[280px] md:px-6 md:py-8 lg:w-[320px]  bg-white hide-scroller ">
      <h1 className="text-2xl font-semibold  mx-auto w-fit md:text-left lg:text-3xl  ">
        Filters
      </h1>
      <h1 className="text-sm text-center mb-6 mx-auto w-fit  lg:text-base lg:mb-8">
        Search by what matters the most
      </h1>
      <Form className="flex flex-col gap-3">
        <FormInput
          fieldName={"bookTitle"}
          inputType={"text"}
          title={"Search by book title"}
          disabled={isPending}
          key={"1"}
        />

        <RangeInput
          fieldName={"bookPrice"}
          title={"Max price"}
          key={"3"}
          disabled={isPending}
          maxValue={"10000"}
          step={10}
          value={"0"}
        />
        <RangeInput
          fieldName={"bookRating"}
          inputType={"text"}
          title={"Minimum rated"}
          key={"4"}
          disabled={isPending}
          maxValue={5}
          step={0.1}
          value={0}
        />

        <SelectInput
          fieldName={"bookGenre"}
          title={"Search by book genre"}
          disabled={isPending}
          key={"6"}
        >
          <option value={""}>All</option>
          <option value={"non-fiction"}>Non-fiction</option>
          <option value={"fiction"}>Fiction</option>
          <option value={"novel"}>Novel</option>
          <option value={"thriller"}>Thriller</option>
          <option value={"romance"}>Romance</option>
        </SelectInput>

        <div className="mt-6 flex items-center gap-2 w-fit ml-auto lg:mt-10">
          <FillButton
            type={"submit"}
            disabled={isPending}
            title={"Apply filters"}
          />
          <Button disabled={isPending} title={"Reset"} />
        </div>
      </Form>
    </div>
  );
};

export default Filters;
