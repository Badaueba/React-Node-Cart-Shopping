import Product from "../product/Product.model";
import { Schema, NativeError } from "mongoose";
import OrderInterface from "./Order.iterface";
import OrderModel from "./Order.model";

class OrderHelper {
    public async findOrder (criteria: Object): Promise<OrderInterface> {
        try {
            return await OrderModel.findOne(criteria)
                .populate({
                    path: "products.product", 
                    populate: {
                        path: "product",
                        model: "product",
                    },
                })
        }
        catch(err) {
            throw new Error(err)
        }
    }

    public makeOrderPice (order: OrderInterface) {
        const price = order.products.reduce( (previous: number, current) => {
            const amountPrice = current.product.price * current.amount;
            return  amountPrice + previous
        }, 0)
        return price;
    }
}

export default new OrderHelper();