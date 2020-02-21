import React from 'react'
import {Tab, Grid} from "semantic-ui-react"
import Product from "./Product"

class ProductsPane extends React.Component {
    
    state = {
        loading: true,
        products: []
    }
    componentDidMount() {
        this.createOrder = this.props.createOrder
        fetch("http://localhost:8000/products")
            .then((res) => res.json())
            .then(products => {
                this.setState({products: products, loading: false})

            })
            .catch(error => console.log(error))
    }

    handleProductClick = (product) => {
        this.props.buy(product)
    }

    render() {
        return (
            <Tab.Pane loading={this.loading}>
                <Grid>
                    {this.state.products.map(product => 
                        (<Grid.Column mobile={16} tablet={4} computer={4} key={product.id}>
                            <Product 
                                product={product}
                                handleProductClick={this.handleProductClick.bind(this, product)}>

                            </Product>
                        </Grid.Column>)
                    )}
                    
                </Grid>
            </Tab.Pane>
        )
    }

    
}

export default ProductsPane;