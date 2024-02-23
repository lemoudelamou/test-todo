import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import jwtDecode from "jwt-decode";

const useAuth = () => {
  const token = useSelector(selectCurrentToken);

  if (token) {
    const decoded = jwtDecode(token);
    console.log(decoded.UserInfo);
    const { email } = decoded.UserInfo;
    console.log(email);

    return { email };
  }

  return { email: "" };
};
export default useAuth;
