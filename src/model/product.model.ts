
import mongoose from "mongoose";
import { Document, } from "mongoose";

interface IProduct{
    title: string,
    description: string,
    price: number,
    stock:number
}

export { IProduct }
const productSchema = new mongoose.Schema<IProduct>({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    }
},
{
        timestamps: true
}
);


const Product = mongoose.model<IProduct>("Product", productSchema);
export default Product;