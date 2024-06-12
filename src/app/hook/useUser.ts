import { useAppDispatch, useAppSelector } from '../redux/hook';
import { AxiosError } from 'axios';
// import axios from 'axios';
// import { Envs } from '../utils/env';
import {
  changeUserStatusFailure,
  changeUserStatusStart,
  changeUserStatusSuccess,
  createUserFailure,
  createUserStart,
  createUserSuccess,
  fetchUsersFailure,
  fetchUsersStart,
  fetchUsersSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess
} from '../redux/slice/userSlice';
import { User, CreateUser } from '../models/user';
import { users } from '../utils/testData';
// import { users } from '../utils/testData'; // Sample data for testing

// const baseURL = Envs.apiLocal;

export function useUser() {
  const state = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleUserFetching = async () => {
    dispatch(fetchUsersStart());
    try {
      // const { data } = await axios.post(`${baseURL}/user/getAllUsers`);
      const data = users;
      console.log(users)
      dispatch(fetchUsersSuccess(data));
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        const errorResponse = error?.response?.data?.message;
        console.log(errorResponse);
        if (errorResponse) {
          dispatch(fetchUsersFailure(errorResponse));
        }
      } else {
        dispatch(fetchUsersFailure('Something went wrong'));
      }
    }
  };

  const handleUserUpdate = async (user: User) => {
    dispatch(updateUserStart());
    console.log("Update User:", user)
    try {
      // const { data } = await axios.put(`${baseURL}/user/updateUser`, user);
      const updatedUser = user; 
      dispatch(updateUserSuccess(updatedUser));
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        const errorResponse = error?.response?.data?.message;
        console.log(errorResponse);
        if (errorResponse) {
          dispatch(updateUserFailure(errorResponse));
        }
      } else {
        dispatch(updateUserFailure('Something went wrong'));
      }
    }
  };

  const handleStatusChange = async (userId: string) => {
    dispatch(changeUserStatusStart());
    try {
      // const { data } = await axios.patch(`${baseURL}/user/updateUserStatus/${userId}`);
      const updatedUser: User = {
        ...users.find(user => user.user_id === userId)!,
        is_active: !users.find(user => user.user_id === userId)!.is_active 
      };
      dispatch(changeUserStatusSuccess(updatedUser));
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        const errorResponse = error?.response?.data?.message;
        console.log(errorResponse);
        if (errorResponse) {
          dispatch(changeUserStatusFailure(errorResponse));
        }
      } else {
        dispatch(changeUserStatusFailure('Something went wrong'));
      }
    }
  };

  const handleUserCreate = async (newUser: CreateUser) => {
    dispatch(createUserStart());
    console.log(newUser)
    try {
      // const { data } = await axios.post(`${baseURL}/user/createUser`, newUser);
      const data = newUser
      dispatch(createUserSuccess(data));
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        const errorResponse = error?.response?.data?.message;
        console.log(errorResponse);
        if (errorResponse) {
          dispatch(createUserFailure(errorResponse));
        }
      } else {
        dispatch(createUserFailure('Something went wrong'));
      }
    }
  };

  return { state, handleUserFetching, handleUserUpdate, handleStatusChange, handleUserCreate };
}

