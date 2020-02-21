import React from "react"
import {Tab, Grid, Item, Modal} from "semantic-ui-react"
import Order from "./Order"
import OrderModal from "./OrderModal"

class OrdersPane extends React.Component {
    state = {
        loading: true,
        orders: [],
        currentOrder: null,
        mode: "create"
    }
    fetchOrders = () => {
        return fetch("http://localhost:8000/orders")
        .then((res) => res.json())
            .then(orders => {
                this.setState({orders: orders, loading: false})
                return orders
            })
            .catch(error => console.log(error))
    }
    componentDidMount(){
       this.fetchOrders() 
    }

    buy = (product) => {

        this.fetchOrders().then(orders => {
            console.log("new product", product)
            const order = this.state.orders.find(order => !order.finished)
            if (this.state.orders.length === 0 || !order) {
                this.setState({currentOrder : {price: product.product.price, products: [ product]}, mode: "create"})
            }
            else {
                order.products.push(product)
                order.price = this.updateOrderPrice(order.products)
                this.setState({currentOrder : order, mode: "edit"})
            }
        })
    }

    updateOrderPrice = (products) => {
        const price = products.reduce((previous, current) => {
            const amountPrice = current.product.price * current.amount;
            return  amountPrice + previous
        }, 0)
        return price;
    }

    toggleOpenCreateModal = () => {
        this.setState({currentOrder: null})
    }

    render() {
        return (
            <Tab.Pane loading={this.loading}>
                <Grid padded>
                    {this.state.orders.map(order => 
                        (
                            <Grid.Row>
                                <Grid.Column key={Math.random() * 4922919391}>
                                    <Item.Group >
                                        <Order 
                                            order={order} 
                                            fetchOrders={this.fetchOrders}>
                                        </Order>
                                    </Item.Group>
                                </Grid.Column>
                            </Grid.Row>
                        )
                    )}
                </Grid>
                
                <Modal
                    open={this.state.currentOrder !== null}>
                    <OrderModal
                        mode={this.state.mode}
                        order={this.state.currentOrder}
                        fetchOrders={this.fetchOrders}
                        toggleOpen={this.toggleOpenCreateModal}>

                    </OrderModal>
                </Modal>
                
            </Tab.Pane>
        )
    }
}

export default OrdersPane