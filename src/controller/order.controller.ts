
import { success } from "zod";
import { createOrder as createOrderService, deleteOrder as deleteProductService, updateOrder as updateOrderService, getOrder as getOrderService } from "../service/order.service";
import { Request, Response } from "express";




export const getOrder = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const orderData = req.body;
  const order = await getOrderService();
  res.status(201).send({
    data: order,
    success: true,
  });
};


export const createOrder = async (req: Request, res: Response): Promise<void> => {
    const orderData = req.body;
    const order = await createOrderService(orderData);
    res.status(201).send({
        data: order,
        success: true
    });
}

export const deleteOrder = async (req: Request, res: Response): Promise<void>=>{
    const orderId = req.params.id as string;
    await deleteProductService(orderId);
    res.status(200).send({
        success: true,
        message: "data is successfully deleted "
    });

}
export const updateOrder = async (req: Request, res: Response): Promise<void> => {
    const orderId=req.params.id as string
    const {user,items,totalAmount,status} = req.body;
    const updateOrderData = {
      user: user,
      items: items,
      totalAmount: totalAmount,
      status: status,
    };
    const options={returnDocument:"after"}
    const updateOrder = await updateOrderService(orderId,updateOrderData,options);

    res.status(200).send({
        success: true,
        data: updateOrder
    });
}