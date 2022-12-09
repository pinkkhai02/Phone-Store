import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.scss";

import Layout from "./components/Layout/Layout";
import { apiCallerWithToken } from "./config/configAxios";
import { authActions, authSelector } from "./redux/slices/authSlice";

function App() {
  const dispatch = useDispatch();
  const { accessToken } = useSelector(authSelector);
  useEffect(() => {
    (async () => {
      if (accessToken) {
        try {
          const res = await apiCallerWithToken(accessToken, dispatch).get(
            "auth/my-profile"
          );
          const { code, message, data } = res.data;
          if (code === 200 || message === "Success") {
            dispatch(authActions.setProfile(data));
          }
        } catch (error) {
          console.log(error);
        }
      }
    })();
  }, [accessToken, dispatch]);
  return <Layout />;
}

export default App;
