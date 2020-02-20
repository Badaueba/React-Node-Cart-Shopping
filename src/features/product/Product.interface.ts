import { Document } from "mongoose";

interface ProductInterface extends Document {
    name: String
    price: number
    amount: number
}

export default ProductInterface
