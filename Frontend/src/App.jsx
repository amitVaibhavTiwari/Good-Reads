import { useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { getUserData } from "../Utils";
import {
  AllBooksPage,
  RegisterPage,
  LoginPage,
  Homepage,
  EditBookPage,
  AddNewBook,
  SingleBookPage,
  LandingPage,
  AboutPage,
  UserBooksPage,
} from "./Pages/Index";

import { useGlobalContext } from "./GlobalContext";
import { Toaster } from "react-hot-toast";
import { useCookies } from "react-cookie";
import ProtectedComponent from "./Components/Protected-Component/ProtectedComponent";

const App = () => {
  const { dispatch } = useGlobalContext();
  const [cookies] = useCookies(["cookie-name"]);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 30 * 60,
        // 30 mins
      },
    },
  });

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />,

      children: [
        {
          index: true,
          element: <LandingPage />,
        },
        {
          path: "/all",
          element: <AllBooksPage />,
        },

        {
          path: "/all/:id",
          element: <SingleBookPage />,
        },

        {
          path: "/about",
          element: <AboutPage />,
        },
      ],
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },

    // protected routes below
    {
      element: <ProtectedComponent />,
      children: [
        {
          path: "/add/new",
          element: <AddNewBook />,
        },
        {
          path: "/user/books",
          element: <UserBooksPage />,
        },
        {
          path: "/edit/:id",
          element: <EditBookPage />,
        },
      ],
    },
  ]);

  const [isLoading, setIsLoading] = useState(true);

  // This useEffect will run initially before our app loads to setup the LoggedIn user (if user is logged in) and user preferred theme in global state value.
  useEffect(() => {
    const func = async () => {
      dispatch({
        type: "GET_INITIAL_THEME_PREFERENCE",
      });
      if (cookies.jwt) {
        const dta = await getUserData();
        if (dta) {
          dispatch({
            type: "SET_CURRENTLY_LOGGED_IN_USER",
            payload: { userName: dta.userName, userId: dta.userId },
          });
        }
      }
      setIsLoading(false);
    };
    func();
  }, []);

  if (isLoading) {
    return <p>loading...</p>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster />
    </QueryClientProvider>
  );
};

export default App;
