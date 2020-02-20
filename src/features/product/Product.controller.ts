import {Request, Response} from "express"
import Product from "./Product.model";

class ProductController {
    public async get(req: Request, res: Response) {
        const products = await Product.find();
        return res.json(products);
    }

    public async post(req: Request, res: Response) {
        if (!req.body.products) {
            return res.json({
                "error": "There is no data to insert"
            });
        }
        try {
            await Product.insertMany(req.body.products)
            return res.send("Products saved");
        }
        catch(err) {
            console.log(err);
            return res.json({
                err: err
            })
        }
        
    }
}

export default ProductController;