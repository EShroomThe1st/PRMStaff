import { Navigate } from "react-router-dom";
// import { translateRoleFromNonsense } from "../utils/generators";

interface PrivateRouteProps {
  inverted: boolean;
  children: React.ReactNode;
  requiredRoles?: string[];
}

const PrivateRoute = ({
  inverted,
  children,
  requiredRoles,
}: PrivateRouteProps) => {
  const token = localStorage.getItem("token");
  const role = 
  // translateRoleFromNonsense(
    localStorage.getItem("role")
  // );
  const isAuth = token ? true : false;

  if (inverted) {
    if (isAuth) {
      switch (role) {
        case "Admin":
          return <Navigate to="/admin/users" />;
        case "Staff":
          return <Navigate to="/staff/products" />;
        default:
          return <Navigate to="/" />;
      }
    } else {
      console.log("Role?", role)
      return children;
    }
  }

  if (role && !requiredRoles?.some((r) => role === r)) return <Navigate to="/" />;

  return isAuth ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
