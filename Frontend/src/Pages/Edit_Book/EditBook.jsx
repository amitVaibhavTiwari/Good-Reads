import Button from "../../Components/Button/Button";
import FillButton from "../../Components/Button/FillButton";
import FormInput from "../../Components/FormInput/FormInput";
import SelectInput from "../../Components/SelectInput/SelectInput";
import TextArea from "../../Components/TextArea/TextArea";

const EditBook = () => {
  return (
    <div className="px-4 py-6 md:py-10">
      <div className="px-2 py-5 shadow-lg max-w-[750px] mx-auto md:px-6 md:py-8 ">
        <h1 className="text-2xl font-semibold mb-6 text-center md:text-left lg:text-3xl lg:mb-8 ">
          Edit book
        </h1>
        <form className="flex flex-col gap-3" action="">
          <FormInput
            fieldName={"bookTitle"}
            required={true}
            inputType={"text"}
            title={"Book title"}
            key={"1"}
          />
          <FormInput
            fieldName={"bookAuthor"}
            required={true}
            inputType={"text"}
            title={"Book author"}
            key={"2"}
          />
          <FormInput
            fieldName={"bookPrice"}
            required={true}
            inputType={"text"}
            title={"Price"}
            key={"3"}
          />
          <FormInput
            fieldName={"bookRating"}
            required={true}
            inputType={"text"}
            title={"Rating"}
            key={"4"}
          />
          <FormInput
            fieldName={"bookPublishDate"}
            required={true}
            inputType={"date"}
            title={"Last published"}
            key={"4a"}
          />
          <TextArea
            fieldName={"bookDescription"}
            required={true}
            inputType={"text"}
            title={"Description"}
            key={"5"}
          />
          <SelectInput
            fieldName={"bookGenre"}
            required={true}
            title={"Genre"}
            key={"6"}
          >
            <option value={"romance"}>Romance</option>
            <option value={"Comedy"}>Comedy</option>
            <option value={"Fiction"}>Fiction</option>
            <option value={"Adult"}>Adult</option>
          </SelectInput>

          <div className="mt-6 flex items-center gap-2 w-full justify-between lg:mt-10">
            <button className="px-4 py-2 text-sm lg:text-md bg-red-600 hover:bg-red-800 text-white rounded-3xl">
              Delete
            </button>
            <span className="flex items-center gap-2">
              <FillButton title={"Update"} />
              <Button title={"Discard"} />
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBook;
