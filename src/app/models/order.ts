export interface Order{
  id: string;
  orderDate: string;
  customerName: string;
  products: {
    id: string;
    img?: { name: string; url?: string; file?: File }[]
    name: string;
    price: number;
    amount: number;
    totalPrice: number;
  }[];
  subTotal: number;
  delivery: number;
  orderPrice: number;
  tax: number;
  paymentMethod: string;
  status: string;
  address: string;
}