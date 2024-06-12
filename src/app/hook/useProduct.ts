import { useAppDispatch, useAppSelector } from '../redux/hook'
import { AxiosError } from 'axios'
// import axios from 'axios'
// import { Envs } from '../utils/env'
import {
  changeProductStatusFailure,
  changeProductStatusStart,
  changeProductStatusSuccess,
  createProductFailure,
  createProductStart,
  createProductSuccess,
  fetchProductsFailure,
  fetchProductsStart,
  fetchProductsSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess
} from '../redux/slice/productSlice'
import { products } from '../utils/testData'
import { Product } from '../models/product'

// const baseURL = Envs.apiLocal

export function useProduct() {
  const state = useAppSelector((state) => state.product)
  const dispatch = useAppDispatch()

  const handleProductFetching = async () => {
    dispatch(fetchProductsStart())
    try {
      // const { data } = await axios.post(`${baseURL}/product/getAllProducts`)
      const data = products
      console.log(products)
      dispatch(fetchProductsSuccess(data))
    } catch (error) {
      console.log(error)
      if (error instanceof AxiosError) {
        const errorResponse = error?.response?.data?.message
        console.log(errorResponse)
        if (errorResponse) {
          dispatch(fetchProductsFailure(errorResponse))
        }
      } else {
        dispatch(fetchProductsFailure('Something went wrong'))
      }
    }
  }

  const handleProductUpdate = async (product: Product) => {
    dispatch(updateProductStart())
    try {
      // const { data } = await axios.put(`${baseURL}/product/updateProduct`, product);
      const updatedProduct = product
      console.log(product)
      dispatch(updateProductSuccess(updatedProduct))
    } catch (error) {
      console.log(error)
      if (error instanceof AxiosError) {
        const errorResponse = error?.response?.data?.message
        console.log(errorResponse)
        if (errorResponse) {
          dispatch(updateProductFailure(errorResponse))
        }
      } else {
        dispatch(updateProductFailure('Something went wrong'))
      }
    }
  }

  const handleStatusChange = async (productId: string) => {
    dispatch(changeProductStatusStart());
    try {

      // const { data } = await axios.patch(`${baseURL}/product/updateProductStatus/${productId}`, );
      const updatedProduct: Product = {
        ...products.find(product => product.id === productId)!,
        status: 'Updated status here' 
      };
      
      dispatch(changeProductStatusSuccess(updatedProduct));
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        const errorResponse = error?.response?.data?.message;
        console.log(errorResponse);
        if (errorResponse) {
          dispatch(changeProductStatusFailure(errorResponse));
        }
      } else {
        dispatch(changeProductStatusFailure('Something went wrong'));
      }
    }
  };

  const handleProductCreate = async (newProduct: Product) => {
    dispatch(createProductStart());
    try {
      // const { data } = await axios.post(`${baseURL}/product/createProduct`, newProduct);
      const createdProduct = newProduct;
      console.log(newProduct)
      dispatch(createProductSuccess(createdProduct));
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        const errorResponse = error?.response?.data?.message;
        console.log(errorResponse);
        if (errorResponse) {
          dispatch(createProductFailure(errorResponse));
        }
      } else {
        dispatch(createProductFailure('Something went wrong'));
      }
    }
  };

  return { state, handleProductFetching, handleProductUpdate, handleStatusChange, handleProductCreate}
}
