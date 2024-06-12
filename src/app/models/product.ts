export interface Product{
  id: string;
  img?: { name: string; url?: string; file?: File }[]
  category: string;
  name: string;
  price: number;
  ratingAmount: number;
  reviewAmount: number;
  reviews: {review: string, rating: number}[];
  description: string;
  status: string;
}

export interface CreateProduct{
  img?: { name: string; url?: string; file?: File }[]
  category: string;
  name: string;
  price: number;
  description: string;
}