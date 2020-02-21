import { Response, Request } from "express"
import Order from "./Order.model"
import orderHelper from "./Order.helper"
import { NativeError } from "mongoose"
import OrderInterface from './Order.iterface'

class OrderController {

    public async get(req: Request, res: Response) {
        try {

            const query = Order.find()
                .populate({
                    path: "products.product", 
                    populate: {
                        path: "product",
                        model: "product",
                    },
                })

            let orders = await query.exec();
            orders = orders.map(order => {
                order.price = orderHelper.makeOrderPice(order)
                return order
            })
            return res.json(orders)
        }
        catch(err) {
            console.log(err)
            res.json(err)
        }
    }

    public async getOne(req: Request, res: Response): Promise<Response> {
        if (!req.params["_id"]) {
            return res.json({err: "There is no data to get"})
        }
        
        orderHelper.findOrder({_id: req.params["_id"]})
            .then((result: OrderInterface) => {
                result.price = orderHelper.makeOrderPice(result)
                res.json(result)
            })
            .catch((err: NativeError) => {
                console.log(err)
                return res.json({err: err.message})
            })
    }

    public async post(req: Request, res: Response) : Promise<Response> {
        
        if (!req.body['order']) {
            return res.json({err: "There is no data to create"})
        }
        try {
            const newOrder = new Order({
                ...req.body['order']
            })
            console.log(newOrder);
            const created = await Order.create(newOrder)
            return res.json("Order created!")
        }
        catch(err) {
            console.log(err)
            return res.json({err: err})
        }
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        if (!req.params["_id"]) {
            return res.json({err: "There is no data to delete"})
        }   
        try {
            const deleted = await Order.deleteOne({_id: req.params["_id"]})
            return res.json({
                message: "Order Deleted", 
                order: deleted
            })
        }
        catch(err) {
            console.log(err)
            return res.json({err: err})
        }
    }

    public async put (req: Request, res: Response): Promise<Response> {
        if (!req.body["order"] && !req.params["_id"]) {
            return res.json({
                err: "There is no order to update"
            })
        }
        try {
            const order = await orderHelper.findOrder({_id : req.params["_id"], finished: false})
            order.products = req.body["order"]["products"]
            const updated = await order.save()
            return res.send({
                "message": "Order Updated",
                order: updated
            })
        }
        catch(err) {
            console.log(err)
            return res.json({err: "Order not found"})
        }

    }

    public async finish (req: Request, res: Response): Promise<Response> {
        if (!req.params["_id"]) {
            return res.json({err: "There is no order to finish"})
        }
        try {
            const order = await orderHelper.findOrder({_id: req.params["_id"]})
            console.log("finish", order)
            order.finished = true
            order.price = orderHelper.makeOrderPice(order);
            const updated = await order.save()
            return res.json(updated)
        }
        catch(err) {
            console.log(err)
            res.json({err: err.message})
        }
    }
}

export default OrderController