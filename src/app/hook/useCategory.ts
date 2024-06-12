import { useAppDispatch, useAppSelector } from '../redux/hook';
import { AxiosError } from 'axios';
import { changeCategoryStatusFailure, changeCategoryStatusStart, changeCategoryStatusSuccess, createCategoryFailure, createCategoryStart, createCategorySuccess, fetchCategoriesFailure, fetchCategoriesStart, fetchCategoriesSuccess } from '../redux/slice/categorySlice';
import { categoriesTestData } from '../utils/testData';
import { Category } from '../models/category';

// const baseURL = Envs.apiLocal

export function useCategory() {
  const state = useAppSelector((state) => state.category);
  const dispatch = useAppDispatch();

  const fetchCategoryData = async () => {
    dispatch(fetchCategoriesStart());
    try {
      // const { data } = await axios.post(`${baseURL}/category/getAllCategories`)
      const data: Category[] = categoriesTestData;
      console.log(data)
      dispatch(fetchCategoriesSuccess(data));
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        const errorResponse = error?.response?.data?.message;
        console.log(errorResponse);
        if (errorResponse) {
          dispatch(fetchCategoriesFailure(errorResponse));
        }
      } else {
        dispatch(fetchCategoriesFailure('Something went wrong'));
      }
    }
  };

  const changeCategoryStatus = async (id: string) => {
    dispatch(changeCategoryStatusStart());
    try {
      // const { data } = await axios.patch(`${baseURL}/category/updateCategoryStatus/${id}`);
      const updatedCategory: Category = {
        ...state.categories.find(category => category.id === id)!
      };
      dispatch(changeCategoryStatusSuccess(updatedCategory));
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        const errorResponse = error?.response?.data?.message;
        console.log(errorResponse);
        if (errorResponse) {
          dispatch(changeCategoryStatusFailure(errorResponse));
        }
      } else {
        dispatch(changeCategoryStatusFailure('Something went wrong'));
      }
    }
  };

  const createCategory = async (newCategory: Category) => {
    dispatch(createCategoryStart());
    try {
      // const { data } = await axios.post(`${baseURL}/category/createCategory`, newCategory);
      console.log("Created category: ", newCategory)
      const data = newCategory
      dispatch(createCategorySuccess(data));
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        const errorResponse = error?.response?.data?.message;
        console.log(errorResponse);
        if (errorResponse) {
          dispatch(createCategoryFailure(errorResponse));
        }
      } else {
        dispatch(createCategoryFailure('Something went wrong'));
      }
    }
  };

  return { state, fetchCategoryData, changeCategoryStatus, createCategory};
}
