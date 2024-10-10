//@ts-nocheck
export interface Product {
  productDetails: any;
  _id: Key | null | undefined;
  id: string;
  name: string;
  price: number;
  description: string;
  stock: number;
  category: string[];
  ratings: number;
  images: string[];
}

export interface ProductQueryParams {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sortOrder?: "asc" | "desc";
}
