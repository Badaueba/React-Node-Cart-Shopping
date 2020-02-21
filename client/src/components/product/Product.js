import React, { Component, Fragment} from "react"
import { Button, Card, Icon, Image} from 'semantic-ui-react'
import productImg from "../../asset/image.png"

class Product extends Component {
    state = {
        product: {}
    }
    componentDidMount() {
        this.setState({product: this.props.product})
        this.handleProductClick = this.props.handleProductClick
    }
    handleClick = () => {
        this.handleProductClick()
    }
    render () {
        return (
            <Card>
                 <Image src={productImg} />
                 <Card.Content>
                    <Fragment>
                        <Card.Header>{this.state.product.name}</Card.Header>
                        <Card.Meta>{this.state.product.price}</Card.Meta>
                        <Card.Description>"asdas"</Card.Description>
                    </Fragment>
                 </Card.Content>

                <Card.Content extra>

                    <Button animated='vertical' onClick={this.handleClick}>
                        <Button.Content hidden>Shop</Button.Content>
                        <Button.Content visible>
                            <Icon name='shop' />
                        </Button.Content>
                    </Button>

                </Card.Content>
            </Card>
             
        );
    }
}

export default Product