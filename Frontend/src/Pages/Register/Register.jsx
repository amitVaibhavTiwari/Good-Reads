import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { customFetch } from "../../../Utils";
import { useGlobalContext } from "../../GlobalContext";
import { toast } from "react-hot-toast";

import FillButton from "../../Components/Button/FillButton";
import FormInput from "../../Components/FormInput/FormInput";
import { PageChanger } from "../../Components/PageChanger/PageChanger";
import SuccessToast from "../../Components/Toast/SuccessToast";

const Register = () => {
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const { dispatch, currentlyLoggedInUser } = useGlobalContext();

  // if user is already logged in
  useEffect(() => {
    if (currentlyLoggedInUser != false) navigate(-1);
  }, []);

  const handleRegisterUser = async (userData) => {
    try {
      const resp = await customFetch().post("api/v1/auth/register", userData, {
        withCredentials: true,
      });
      return resp.data;
    } catch (error) {
      console.log(error);
      setIsError(error?.response?.data?.message || "Something went wrong");
      return;
    }
  };

  const verifyUserInputs = (data) => {
    const nameRegex = /^[A-Za-z ]{1,15}$/;
    const emailRegex = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm;
    const passwordRegex =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;

    if (!emailRegex.test(data.email)) {
      setIsError("Enter a valid email");
      return false;
    }
    if (!nameRegex.test(data.firstName)) {
      setIsError("Invalid first name entered");
      return false;
    }
    if (!nameRegex.test(data.lastName)) {
      setIsError("Invalid last name entered");
      return false;
    }
    if (!nameRegex.test(data.lastName)) {
      setIsError("Invalid last name entered");
      return false;
    }
    if (!passwordRegex.test(data.password)) {
      setIsError(
        "Password should be 8-16 characters long and must contain a special character."
      );
      return false;
    } else {
      return true;
    }
  };

  const { mutate, isPending } = useMutation({
    mutationFn: handleRegisterUser,
    onSuccess: async (data) => {
      if (data?.created == true) {
        dispatch({
          type: "SET_CURRENTLY_LOGGED_IN_USER",
          payload: { userName: data.userName, userId: data.userId },
        });
        toast.custom((t) => (
          <SuccessToast message={`Account created succesfully`} toast={t} />
        ));
        navigate("/");
      }
    },
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const dataObj = Object.fromEntries(data);
    const resp = verifyUserInputs(dataObj);
    if (resp === true) {
      await mutate(dataObj);
    }
  };

  return (
    <PageChanger>
      <div className="min-h-[700px] px-4 h-screen flex flex-col justify-center dark:bg-black dark:text-green-700">
        <div className="max-w-[450px] w-full  mx-auto">
          <h1 className="text-3xl font-semibold text-center lg:text-4xl dark:text-white">
            Create an account
          </h1>
          <p className="text-base text-center lg:text-lg">
            Provide the following details
          </p>
          <form
            className="mt-8 flex flex-col gap-4"
            onSubmit={(e) => handleFormSubmit(e)}
          >
            <FormInput
              disabled={isPending}
              fieldName={"firstName"}
              required={true}
              inputType={"text"}
              title={"First name"}
              key={"1"}
            />
            <FormInput
              fieldName={"lastName"}
              required={true}
              disabled={isPending}
              inputType={"text"}
              title={"Last name"}
              key={"2"}
            />
            <FormInput
              fieldName={"email"}
              required={true}
              disabled={isPending}
              inputType={"email"}
              title={"Email"}
              key={"4"}
            />
            <FormInput
              fieldName={"password"}
              required={true}
              disabled={isPending}
              inputType={"text"}
              title={"Password"}
              key={"4a"}
            />
            {isError && (
              <p className="text-sm lg:text-base text-red-500">{isError}</p>
            )}

            <div className="mt-6">
              <FillButton
                disabled={isPending}
                type="submit"
                title="Register"
                fullWidth={true}
              />
            </div>
          </form>

          <p className="text-sm mt-5 lg:text-base text-center dark:text-white">
            Already have an account?{" "}
            <span
              onClick={() => {
                if (!isPending) navigate("/login");
              }}
              className="font-semibold cursor-pointer hover:underline dark:text-green-700"
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </PageChanger>
  );
};

export default Register;
