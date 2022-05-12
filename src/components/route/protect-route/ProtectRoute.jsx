import { useUser } from "context";
import { ROUTE_LANDING } from "utils";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectRoute = () => {
  const { userState } = useUser();

  return userState.isUserAuthTokenExist ? (
    <Outlet />
  ) : (
    <Navigate to={ROUTE_LANDING} replace={true} />
  );
};
