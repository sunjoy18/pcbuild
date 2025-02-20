export interface AdditionalInfo {
  weight: string;
  brand: string;
  productCategory: string;
  certification: string;
  warranty: string;
  _id: string;
}

export interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category: string;
  stock: number;
  additionalInfo: AdditionalInfo;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CartItem {
  _id: string;
  productId: Product;
  name: string;
  price: number;
  quantity: number;
}
