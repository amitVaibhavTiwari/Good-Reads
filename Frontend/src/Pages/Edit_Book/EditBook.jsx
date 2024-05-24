import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { customFetch } from "../../../Utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { toast } from "react-hot-toast";

import FillButton from "../../Components/Button/FillButton";
import FormInput from "../../Components/FormInput/FormInput";
import SelectInput from "../../Components/SelectInput/SelectInput";
import TextArea from "../../Components/TextArea/TextArea";
import { PageChanger } from "../../Components/PageChanger/PageChanger";
import SuccessToast from "../../Components/Toast/SuccessToast";

const EditBook = () => {
  const { id } = useParams();
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Function to fetch single book details initially
  const getSingleBook = async () => {
    try {
      const resp = await customFetch().get(`api/v1/books/get/${id}`);
      return resp.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const { data, error, status } = useQuery({
    queryKey: ["singleBook", id],
    queryFn: getSingleBook,
  });

  // function to edit book
  const handleEditBook = async (book) => {
    try {
      const resp = await customFetch().put(`api/v1/books/edit/${id}`, book, {
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
    mutationFn: handleEditBook,
    onSuccess: async (data) => {
      if (data.edited === true) {
        // removing all queries so that react-query refetches all the books and user can see the edited book.
        queryClient.removeQueries();
        toast.custom((t) => (
          <SuccessToast message={`Book edited succesfully`} toast={t} />
        ));
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
      <div className="px-4 py-6 md:py-10 dark:bg-black dark:text-white">
        <div className="px-2 py-5 min-h-[600px] shadow-lg max-w-[750px] mx-auto md:px-6 md:py-8 dark:bg-[#14251c]">
          <h1 className="text-2xl font-semibold mb-6 text-center md:text-left lg:text-3xl lg:mb-8 dark:text-green-700">
            Edit book
          </h1>

          {/* Below is edit book form */}
          {status === "pending" && (
            <p className="text-center">Loading book details...</p>
          )}
          {status === "error" && (
            <p className="text-center text-red-600">Error : {error.message}</p>
          )}
          {/* form */}
          {data?.found == true && (
            <form
              className="flex flex-col gap-3"
              onSubmit={(e) => handleFormSubmit(e)}
            >
              <FormInput
                fieldName={"bookTitle"}
                required={true}
                inputType={"text"}
                title={"Book title"}
                key={"1"}
                value={data.book.bookTitle}
                disabled={isPending}
              />
              <FormInput
                fieldName={"bookAuthor"}
                required={true}
                inputType={"text"}
                title={"Book author"}
                key={"2"}
                value={data.book.bookAuthor}
                disabled={isPending}
              />
              <FormInput
                fieldName={"bookPrice"}
                required={true}
                inputType={"text"}
                title={"Price"}
                key={"3"}
                value={data.book.bookPrice}
                disabled={isPending}
              />
              <FormInput
                fieldName={"bookRating"}
                required={true}
                inputType={"text"}
                title={"Rating"}
                key={"4"}
                value={data.book.bookRating}
                disabled={isPending}
              />
              <FormInput
                fieldName={"bookPublishDate"}
                required={true}
                inputType={"date"}
                title={"Last published"}
                key={"4a"}
                disabled={isPending}
                value={dayjs(data.book.bookLastPublished).format("YYYY-MM-DD")}
              />
              <TextArea
                fieldName={"bookDescription"}
                required={true}
                inputType={"text"}
                title={"Description"}
                key={"5"}
                value={data.book.bookDescription}
                disabled={isPending}
              />
              <SelectInput
                fieldName={"bookGenre"}
                required={true}
                title={"Genre"}
                key={"6"}
                value={data.book.bookGenre}
                disabled={isPending}
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

              <div className="mt-6 lg:mt-10 ml-auto">
                <FillButton
                  disabled={isPending}
                  type={"submit"}
                  title={"Update"}
                />
              </div>
            </form>
          )}
        </div>
      </div>
    </PageChanger>
  );
};

export default EditBook;
