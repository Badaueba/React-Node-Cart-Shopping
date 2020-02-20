import { Document, Schema} from "mongoose"
import ProductInterface from "../product/Product.interface"

export default interface OrderInterface extends Document {
    _doc: Schema.Types.DocumentArray
    finished: Boolean
    products: Array<ProductOrdered>
    price: number
    createdAt: Schema.Types.String
    updatedAt: Schema.Types.String
}

export class ProductOrdered {
    product: ProductInterface
    amount: number
}


