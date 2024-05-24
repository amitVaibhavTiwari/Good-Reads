import { Navigate, Outlet } from "react-router-dom";
import { useGlobalContext } from "../../GlobalContext";
import SuccessToast from "../Toast/SuccessToast";
import { toast } from "react-hot-toast";

// This component is to protect certain routes if user is not logged in.
const ProtectedComponent = () => {
  const { currentlyLoggedInUser } = useGlobalContext();
  if (currentlyLoggedInUser == false) {
    toast.custom((t) => (
      <SuccessToast message={`Create an account to continue`} toast={t} />
    ));
  }

  return currentlyLoggedInUser?.userId ? (
    <Outlet />
  ) : (
    <Navigate to="/register" replace />
  );
};

export default ProtectedComponent;
