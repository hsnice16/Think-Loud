import { ROUTE_LANDING } from "utils";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectRoute = () => {
  const { isUserAuthTokenExist } = useSelector((state) => state.user);

  return isUserAuthTokenExist ? (
    <Outlet />
  ) : (
    <Navigate to={ROUTE_LANDING} replace={true} />
  );
};
