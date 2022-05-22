import { ROUTE_HOME } from "utils";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const RestrictRoute = () => {
  const { isUserAuthTokenExist } = useSelector((state) => state.user);

  return isUserAuthTokenExist ? (
    <Navigate to={ROUTE_HOME} replace={true} />
  ) : (
    <Outlet />
  );
};
