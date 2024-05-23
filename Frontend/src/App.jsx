import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import HomePage from "./Pages/Home_Page/HomePage";
import Landing from "./Pages/Landing_Page/Landing";
import AllBooks from "./Pages/All_Books_Page/AllBooks";
import SingleBookPage from "./Pages/Single_Book_Page/SingleBookPage";
import AddNew from "./Pages/Add_New_Book_Page/AddNew";
import EditBook from "./Pages/Edit_Book/EditBook";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import { useEffect, useState } from "react";
import { useGlobalContext } from "./GlobalContext";
import { getUserData } from "../Utils";
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
      element: <HomePage />,

      children: [
        {
          index: true,
          element: <Landing />,
        },
        {
          path: "/all",
          element: <AllBooks />,
        },

        {
          path: "/all/:id",
          element: <SingleBookPage />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    // protected routes below

    {
      element: <ProtectedComponent />,
      children: [
        {
          path: "/add/new",
          element: <AddNew />,
        },
        {
          path: "/edit/:id",
          element: <EditBook />,
        },
      ],
    },
  ]);

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const func = async () => {
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
    </QueryClientProvider>
  );
};

export default App;
