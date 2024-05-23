import { Navigate, Outlet } from "react-router-dom";
import { useGlobalContext } from "../../GlobalContext";
// This component is to protect certain routes if user is not logged in.
const ProtectedComponent = () => {
  const { currentlyLoggedInUser } = useGlobalContext();

  return currentlyLoggedInUser?.userId ? (
    <Outlet />
  ) : (
    <Navigate to="/register" replace />
  );
};

export default ProtectedComponent;
