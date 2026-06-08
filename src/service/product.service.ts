import Product, { IProduct } from "@models/product.model";

export const creatProduct = async (productData:IProduct):Promise<IProduct> => {
    return Product.create(productData);
}

export const getProduct = async (): Promise<IProduct[]> => {
    return Product.find();
}

export const updateProduct = async (productId:string,ProductData={},options={}): Promise<IProduct|null> => {
    return Product.findByIdAndUpdate(productId, ProductData,options);
}

export const deleteProduct = async (productId: string): Promise<void|null> => {
    return Product.findByIdAndDelete(productId);
}