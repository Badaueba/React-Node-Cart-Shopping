import {Schema, model, Document} from "mongoose";
import OrderInterface  from './Order.iterface';

const OrderSchema = new Schema({
    finished: {type: Boolean, default: false},
    products: [
        {
            product: {type: Schema.Types.ObjectId, ref: "product"},
            amount: {type: Number, default: 1}
        }
    ],
    price: {type: Number, default: 0}
}, {
    timestamps: true
})

export default model<OrderInterface>("order", OrderSchema);