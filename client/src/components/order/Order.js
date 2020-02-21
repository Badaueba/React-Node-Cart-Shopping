import React, {Fragment} from "react"
import { Button, Item, Divider, Modal} from 'semantic-ui-react'

import orderImg from "../../asset/image.png"
import OrderModal from "./OrderModal"

class Order extends React.Component {
    state = {
        order: {
            products: []
        },
        editOpen: false,
        removeOpen: false,
        removeModalContent: "Are you sure you want to delete it?"
    }

    componentDidMount() {
        this.fetchOrders = this.props.fetchOrders;
        this.setState({order: this.props.order})
    }

    toggleEditModal = () => {
        const editOpen = !this.state.editOpen
        this.setState({editOpen: editOpen})
    }

    toggleRemoveModal = () => {
        const removeOpen = !this.state.removeOpen
        this.setState({removeOpen: removeOpen})
    }

    deleteOrder = (order) => {
        fetch(`http://localhost:8000/orders/${this.state.order._id}`, {
            method: "DELETE"
        })
        .then(res => res.json())
        .then(data => {
            this.setState({removeModalContent: data["message"]})
            setTimeout(() => {
                this.setState({removeOpen: false})
                this.fetchOrders();
            }, 1000)
        })
        .catch(err => console.log(err))
    }

    makeDate = () => {
        return new Date(this.props.order.createdAt).toISOString().substring(0, 10)
    }
    render() {
        return (
            <Fragment>
                <Item>
                    <Item.Image size='small' src={orderImg}/>
            
                    <Item.Content verticalAlign='middle'>
                        <Item.Header>Order:{this.state.order._id}</Item.Header>
                        <Item.Description>
                            items: {this.state.order.products.length}
                            <Divider></Divider>
                            date: {this.makeDate()}
                            <Divider></Divider>
                            price: ${this.state.order.price }
                        </Item.Description>
                        <Item.Extra>
                            {
                                this.state.order.finished ? 
                                (<Fragment>
                                    <Button floated='right' size="small" color="red" onClick={this.toggleRemoveModal}>x</Button>
                                    <Button floated='right' size="small" color="blue" disabled>finished</Button>
                                </Fragment>) : 
                                (<Fragment>
                                    <Button floated='right' size="small" color="red" onClick={this.toggleRemoveModal}>x</Button>
                                    <Button floated='right' size="small" color="blue" onClick={this.toggleEditModal}>edit</Button>
                                </Fragment>)
                            }
                
                        </Item.Extra>
                    </Item.Content>
                </Item>

                <Modal open={this.state.removeOpen}>
                    <Modal.Header>Delete order #{this.state.order._id}</Modal.Header>
                    <Modal.Content>
                        <p>{this.state.removeModalContent}</p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this.toggleRemoveModal}>No</Button>
                        <Button onClick={this.deleteOrder} negative labelPosition='right' icon='checkmark'content='Yes'/>
                    </Modal.Actions>
                </Modal>
                
                <Modal open={this.state.editOpen}>
                    <OrderModal 
                        mode="edit"
                        toggleOpen={this.toggleEditModal}
                        fetchOrders={this.fetchOrders}
                        order={this.state.order}>
                    </OrderModal>
                </Modal>
                
            </Fragment>
        )
    }
}

export default Order