import { useNavigate } from "react-router-dom";
import { useAuth } from "./Auth";

export const RequiredAuth = ({ ...children }) => {
  const navigate = useNavigate();
  const auth = useAuth();

  if (!auth.user) {
    navigate("/login");
  }

  return children;
};
