
import { creatProduct as creatProductService,getProduct as getProductService ,updateProduct as updateUserService,deleteProduct as deleteProductService} from "../service/product.service";
import { Request,Response } from "express";


export const createProduct = async(req: Request, res: Response):Promise<void>=> {
    const productData = req.body;

    const product = await creatProductService(productData);
    res.status(201).send({
        success: true,
        data: product,
        message:"data successfully create"
        
    });
}

export const getProduct = async (req: Request, res: Response): Promise<void>=>{
    const productData = await getProductService();
    res.status(200).send({
        success: true,
        data: productData
    });
}

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
    const productId = req.params.id as string;
    const { title, description, price, stock } = req.body;
    const productData = { title: title, description: description, price: price, stock: stock }
    const options={returnDocument:"after"}
    const product = await updateUserService(productId, productData,options);
    
    if (!product) {
        res.status(500).send({
            success: false,
            message: "something went wrong"
        });
        return;
    }
    res.status(200).send({
        success: true,
        data: product
    });


}

export const deleteProduct = async (req: Request, res: Response):Promise<void>=> {
    const productId = req.params.id as string;
    const product = await deleteProductService(productId);
    res.send({
        data: product,
        success: true,
        message:"Data is successfully deleted"
    });
}