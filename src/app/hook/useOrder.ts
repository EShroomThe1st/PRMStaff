import { useAppDispatch, useAppSelector } from '../redux/hook'
import { AxiosError } from 'axios'
// import axios from 'axios'
// import { Envs } from '../utils/env'
import { 
  changeOrderStatusFailure,
  changeOrderStatusStart,
  changeOrderStatusSuccess,
  fetchOrdersFailure, 
  fetchOrdersStart, 
  fetchOrdersSuccess 
} from '../redux/slice/orderSlice'

import { testOrders } from '../utils/testData'
import { Order } from '../models/order'

// const baseURL = Envs.apiLocal

export function useOrder() {
  const state = useAppSelector((state) => state.order)
  const dispatch = useAppDispatch()

  const handleOrderFetching = async () => {
    dispatch(fetchOrdersStart())
    try {
      // const { data } = await axios.post(`${baseURL}/order/getAllOrders`)
      const data = testOrders 
      console.log(testOrders)
      dispatch(fetchOrdersSuccess(data))
    } catch (error) {
      console.log(error)
      if (error instanceof AxiosError) {
        const errorResponse = error?.response?.data?.message
        console.log(errorResponse)
        if (errorResponse) {
          dispatch(fetchOrdersFailure(errorResponse))
        }
      } else {
        dispatch(fetchOrdersFailure('Something went wrong'))
      }
    }
  }

  const handleStatusChange = async (orderId: string) => {
    dispatch(changeOrderStatusStart());
    try {

      // const { data } = await axios.patch(`${baseURL}/order/updateOrderStatus/${orderId}`, );

      const updatedOrder: Order = {
        ...testOrders.find(order => order.id === orderId)!,
        status: 'Updated status here' 
      };
      
      dispatch(changeOrderStatusSuccess(updatedOrder));
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        const errorResponse = error?.response?.data?.message;
        console.log(errorResponse);
        if (errorResponse) {
          dispatch(changeOrderStatusFailure(errorResponse));
        }
      } else {
        dispatch(changeOrderStatusFailure('Something went wrong'));
      }
    }
  };

  return { state, handleOrderFetching, handleStatusChange }
}
