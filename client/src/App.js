import React from 'react';
import './App.css';
import {Container, Header, Tab} from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css'
import ProductsPane from "./components/product/ProductsPane.js";
import OrdersPane from './components/order/OrdersPane';


class App  extends React.Component {
	constructor(props){
		super(props)
		this.ordersPaneRef = React.createRef()
	}
	state = {
		activeIndex: 0,
		orders: []
	}

	handleTabChange = (e, { activeIndex }) => this.setState({ activeIndex })

	buy = (product) => {
		this.setState({activeIndex: 1})
		
		setTimeout(() => {
			if (this.ordersPaneRef.current) 
				this.ordersPaneRef.current.buy({amount: 1, product})
		}, 400)
	}

	panes = [
		{ menuItem: 'Products', render: () =>  <ProductsPane buy={this.buy}></ProductsPane>},
		{ menuItem: 'Cart', render: () => <OrdersPane ref={this.ordersPaneRef}></OrdersPane> },
	]

	render() {
		return (
			<Container>
				<Header size="huge">
					Shopping Cart Example
				</Header>
	
				<Tab 
					menu={{color:"teal", inverted:true}}
					activeIndex={this.state.activeIndex}
					panes={this.panes}
					onTabChange={this.handleTabChange}>
				</Tab>
			</Container>
		);
	}

}

export default App;
