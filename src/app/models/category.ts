export interface Category{
  id: string;
  key: string;
  value: string;
  orderAmount: number;
  status: string;
}

export interface CreateCategory{
  key: string;
}