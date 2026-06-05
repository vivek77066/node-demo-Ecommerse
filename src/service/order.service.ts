import Order, { IOrder } from "../model/order.model";

export const createOrder = async (orderData:IOrder): Promise<IOrder> => {
    return Order.create(orderData)
}

export const deleteOrder = async (orderId: string): Promise<IOrder | null> => {
    return Order.findByIdAndUpdate(orderId);
}

export const getOrder = async (): Promise<IOrder[]> => {
    return Order.find();
}

export const updateOrder = async (orderId: string, OrderData={}, options={}): Promise<IOrder|null> => {
    return Order.findByIdAndUpdate(orderId,OrderData,options)
}