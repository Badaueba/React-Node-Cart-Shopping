import {Schema, model} from "mongoose";
import ProductInterface from './Product.interface';

const ProductSchema = new Schema({
    name: {type: String, required: true, unique: true},
    price: {type: Number, required: true}
}, {
    timestamps: true
})

export default model<ProductInterface>("product", ProductSchema)