import { useAppDispatch, useAppSelector } from "../redux/hook";
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from "../redux/slice/loginSlice";
import { LoginFormValues } from "../pages/loginPage";
import { NavigateFunction } from "react-router-dom";
import { AxiosError } from "axios";
import axios from "axios";
import { Envs } from "../utils/env";

const baseURL = Envs.apiLocal;

export function useAuth() {
  const state = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleLogin = async (
    value: LoginFormValues,
    navigate: NavigateFunction,
  ) => {
    dispatch(loginStart());
    try {
      const { data } = await axios.post(`${baseURL}/auth/login`, {
        ...value,
      });
      const { accessToken, role, user_id } = data.data;
      dispatch(loginSuccess(user_id));
      localStorage.setItem("token", accessToken);
      localStorage.setItem("role", role);
      localStorage.setItem("user", user_id);
      navigate("/");
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        const errorResponse = error?.response?.data?.message;
        console.log(errorResponse);
        if (errorResponse) {
          dispatch(loginFailure(errorResponse));
        }
      } else {
        dispatch(loginFailure("Something went wrong"));
      }
    }
  };

  return { state, handleLogin };
}