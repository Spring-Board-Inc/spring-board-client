import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const RequireAuth = ( { allowedRoles }) => {
    const { user } = useSelector((state) => state.auth);
    const location = useLocation();

  return (
    user?.UserClaims?.Roles?.includes(allowedRoles?.find(role => user?.UserClaims?.Roles?.includes(role)))
            ? <Outlet />
            : user?.UserClaims?.Email
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to='/login' state={{ from: location }} replace />
  )
}

export default RequireAuth