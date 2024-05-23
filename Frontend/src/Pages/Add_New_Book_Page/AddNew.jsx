import { useMutation } from "@tanstack/react-query";
import { customFetch } from "../../../Utils";
import Button from "../../Components/Button/Button";
import FillButton from "../../Components/Button/FillButton";
import FormInput from "../../Components/FormInput/FormInput";
import { PageChanger } from "../../Components/PageChanger/PageChanger";
import SelectInput from "../../Components/SelectInput/SelectInput";
import TextArea from "../../Components/TextArea/TextArea";
import { useGlobalContext } from "../../GlobalContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddNew = () => {
  const { currentlyLoggedInUser } = useGlobalContext();
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);

  const handleAddNewBook = async (book) => {
    try {
      const resp = await customFetch().post("api/v1/books/add", book, {
        withCredentials: true,
      });
      return resp.data;
    } catch (error) {
      console.log(error);
      setIsError(error?.response?.data?.message || "Something went wrong");
      return;
    }
  };

  const { mutate, isPending } = useMutation({
    mutationFn: handleAddNewBook,
    onSuccess: async (data) => {
      if (data.created == true) {
        navigate(-1);
      }
    },
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const dataObj = Object.fromEntries(data);
    await mutate(dataObj);
  };

  return (
    <PageChanger>
      <div className="px-4 py-6 md:py-10">
        <div className="px-2 py-5 shadow-lg max-w-[750px] mx-auto md:px-6 md:py-8 ">
          <h1 className="text-2xl font-semibold mb-3 text-center md:text-left lg:text-3xl lg:mb-5 ">
            Welcome,{" "}
            <span className="text-md lg:text-lg">
              {currentlyLoggedInUser.userName}
            </span>
          </h1>
          <h1 className="text-2xl font-semibold mb-6 text-center md:text-left lg:text-3xl lg:mb-8 ">
            Add new book
          </h1>
          <form
            className="flex flex-col gap-3"
            onSubmit={(e) => handleFormSubmit(e)}
          >
            <FormInput
              fieldName={"bookTitle"}
              required={true}
              inputType={"text"}
              title={"Book title"}
              disabled={isPending}
              key={"1"}
            />
            <FormInput
              fieldName={"bookAuthor"}
              required={true}
              inputType={"text"}
              title={"Book author"}
              key={"2"}
              disabled={isPending}
            />
            <FormInput
              fieldName={"bookPrice"}
              required={true}
              inputType={"text"}
              title={"Price"}
              key={"3"}
              disabled={isPending}
            />
            <FormInput
              fieldName={"bookRating"}
              required={true}
              inputType={"text"}
              title={"Rating"}
              key={"4"}
              disabled={isPending}
            />
            <FormInput
              fieldName={"bookLastPublished"}
              required={true}
              inputType={"date"}
              title={"Last published"}
              key={"4a"}
              disabled={isPending}
            />
            <TextArea
              fieldName={"bookDescription"}
              required={true}
              inputType={"text"}
              title={"Description"}
              key={"5"}
              disabled={isPending}
            />
            <SelectInput
              fieldName={"bookGenre"}
              required={true}
              title={"Genre"}
              disabled={isPending}
              key={"6"}
            >
              <option value={"non-fiction"}>Non-fiction</option>
              <option value={"fiction"}>Fiction</option>
              <option value={"novel"}>Novel</option>
              <option value={"thriller"}>Thriller</option>
              <option value={"romance"}>Romance</option>
            </SelectInput>
            {isError && (
              <p className="mt-4 text-sm lg:text-base text-red-500">
                {isError}
              </p>
            )}
            <div className="mt-6 flex items-center gap-2 w-fit ml-auto lg:mt-10">
              <FillButton type={"submit"} disabled={isPending} title={"Add"} />
              <Button disabled={isPending} title={"Discard"} />
            </div>
          </form>
        </div>
      </div>
    </PageChanger>
  );
};

export default AddNew;
