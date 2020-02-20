import * as Express from "express";
import {Request, Response} from "express";
import * as morgan from "morgan";
import * as mongoose from 'mongoose';
import mongooseURI from './config/MongooseURI';
const port = process.env.port || 8000;

import productRouter from "./features/product/Product.router";
import orderRouter from "./features/order/Order.route";

class ExpressApplication {
    public app: Express.Application;

    public constructor() {
        this.app = Express()
        this.app.use(morgan("dev"))
        this.app.use(Express.json())
        this.setHeaders()
        this.setRoutes()
    }

    public init () {
        this.connectDatabase()
            .then(() => {
                console.log("MongoDB connected");
                this.app.listen(port, () => console.log(`running ${port}`))
            })
    }

    private connectDatabase(): Promise<mongoose.Mongoose> {
        console.log(mongooseURI);
        return mongoose.connect(mongooseURI, {useNewUrlParser: true, useUnifiedTopology: true});
    }

    private setHeaders() {
        this.app.use((req, res, next) => {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT");
            res.setHeader("Access-Control-Allow-Headers", "Content-Type")
            if (req.method === "OPTIONS") {
                return res.sendStatus(200)
            }
            next()
        })
    }

    private setRoutes() {
        this.app.get("/", (req, res) => {
            res.send("hello hello")
        })
        this.app.use("/products", productRouter)
        this.app.use("/orders", orderRouter)
    }

}

export default ExpressApplication;