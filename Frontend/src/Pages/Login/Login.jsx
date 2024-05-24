import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { customFetch } from "../../../Utils";

import SuccessToast from "../../Components/Toast/SuccessToast";
import FillButton from "../../Components/Button/FillButton";
import FormInput from "../../Components/FormInput/FormInput";
import { PageChanger } from "../../Components/PageChanger/PageChanger";
import { useGlobalContext } from "../../GlobalContext";

const Login = () => {
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const { dispatch, currentlyLoggedInUser } = useGlobalContext();

  // if user is already logged in
  useEffect(() => {
    if (currentlyLoggedInUser != false) navigate(-1);
  }, []);

  //
  //
  //
  const handleLoginUser = async (userData) => {
    try {
      const resp = await customFetch().post("api/v1/auth/login", userData, {
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
    mutationFn: handleLoginUser,
    onSuccess: async (data) => {
      if (data?.userName) {
        dispatch({
          type: "SET_CURRENTLY_LOGGED_IN_USER",
          payload: { userName: data.userName, userId: data.userId },
        });
        toast.custom((t) => (
          <SuccessToast message={`Welcome back ${data.userName}`} toast={t} />
        ));
        navigate("/");
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
      <div className="h-screen min-h-[500px] px-4  flex flex-col justify-center dark:bg-black dark:text-green-700">
        <div className="max-w-[450px] w-full  mx-auto">
          <h1 className="text-3xl font-semibold text-center lg:text-4xl dark:text-white">
            Welcome back
          </h1>
          <p className="text-base text-center lg:text-lg">
            Login to your account
          </p>
          <form
            onSubmit={(e) => handleFormSubmit(e)}
            className="mt-8 flex flex-col gap-4"
          >
            <FormInput
              fieldName={"email"}
              required={true}
              inputType={"email"}
              title={"Email"}
              key={"4"}
              disabled={isPending}
            />
            <FormInput
              fieldName={"password"}
              required={true}
              inputType={"text"}
              title={"Password"}
              disabled={isPending}
              key={"4a"}
            />

            {isError && (
              <p className="text-sm lg:text-base text-red-500">{isError}</p>
            )}

            <div className="mt-8">
              <FillButton
                type="submit"
                disabled={isPending}
                title="Login"
                fullWidth={true}
              />
            </div>
          </form>

          <p className="text-sm mt-5 lg:text-base text-center dark:text-white">
            New here?{" "}
            <span
              onClick={() => navigate("/register")}
              className="font-semibold cursor-pointer hover:underline dark:text-green-700"
            >
              Register
            </span>
          </p>
        </div>
      </div>
    </PageChanger>
  );
};

export default Login;
