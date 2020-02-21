import React, { Fragment } from "react"
import {Modal, Button, Icon, Grid, Item, Divider} from "semantic-ui-react"
import orderImg from "../../asset/image.png"

class OrderModal extends React.Component {
	state = {
		mode: "edit",
		order: {
			products: []
		}
	}
	
	componentDidMount() {
		this.setState({
			mode: this.props.mode,
			order: this.props.order
		})
		this.toggleOpen = this.props.toggleOpen
		this.fetchOrders = this.props.fetchOrders
	}

	increaseAmount = (productPrice, index) => {
		const products = this.state.order.products
		// console.log(products, productPrice, index)
		products[index].amount ++;
		this.setState(state => {
			state.order.products = products
			state.order.price += productPrice
			return state
		})
	}
	decreaseAmount = (productPrice, index) => {
		const products = this.state.order.products
		products[index].amount --

		this.setState(state => {
			state.order.products = products
			state.order.price -= productPrice
			if (state.order.price < 0) 
				state.order.price = 0
			return state
		})
		if (products[index].amount < 1) {
			this.setState(state => {
				state.order.products.splice(index, 1)
				return state
			})
		}
	}

	continueShopping = () => {
		let request, method
		const body = {order: this.state.order}
		const headers = {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
		if (this.state.mode === "edit") {
			request = `http://localhost:8000/orders/${this.state.order._id}`
			method = "PUT"
			console.log(body);
		}
		else {
			request = `http://localhost:8000/orders/`
			method = "POST"
		}

		fetch(request, {
			method: method,
			headers: headers,
			body: JSON.stringify(body)
		})
		.then(res => res.json())
		.then(data => {
			console.log(data)
			this.toggleOpen()
			this.fetchOrders()
		})
		.catch(err => console.log(err))
	}

	finish = () => {
		const body = {order: this.state.order}
		const headers = {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
		let request, method
		if (this.state.mode === "edit") {
			console.log(body);
			request = `http://localhost:8000/orders/finish/${this.state.order._id}`
			method = "PUT"
		}
		else {
			request = `http://localhost:8000/orders/`
			method = "POST"
			body.order.finished = true
		}

		fetch(request, {method: method, headers: headers, body: JSON.stringify(body)})
		.then(res => res.json())
		.then(data => {
			this.toggleOpen()
			this.fetchOrders()
		})
	}

	render() {
		return (
			<Fragment>
				
				
				{ this.state.mode === "edit" ?
					<Modal.Header> Edit Order </Modal.Header> :
					<Modal.Header> Create Order </Modal.Header>
				}

				<Modal.Content image scrolling>
					
					<Grid padded> {
						this.state.order.products.map((info, index) => 	
							<Grid.Row>
								<Grid.Column key={Math.random()}>
									<Item.Group>
									<Item floated="right">
										<Item.Image size='tiny' src={orderImg}/>
								
										<Item.Content verticalAlign='right'>
											<Item.Header>Name:{info.product.name}</Item.Header>
											<Item.Description>
												amount: {info.amount}
												<Divider></Divider>
												price: ${info.product.price}
											</Item.Description>
											<Item.Extra>
												<Button floated='center' size="small" color="blue"
													onClick={this.decreaseAmount.bind(this, info.product.price, index)}>-
												</Button>
												<Button floated='center' 
													size="small" 
													color="blue" 
													onClick={this.increaseAmount.bind(this, info.product.price, index)}>
													+
												</Button>
											</Item.Extra>
										</Item.Content>
									</Item>
									</Item.Group>
								</Grid.Column>
							</Grid.Row>
						)
					}
					</Grid>
				</Modal.Content>

				<Modal.Actions>
					<h3 floated="left">Total price: {this.state.order.price}</h3>
					<Button primary onClick={this.continueShopping}>
						Continue Shopping <Icon name='shop left' />
					</Button>
					<Button positive onClick={this.finish}>
						Finish <Icon name='chevron right' />
					</Button>
				</Modal.Actions>
			</Fragment>
		);
	}
}

export default OrderModal