import React, { Component } from "react";
//import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "reactstrap";
import CategoryList from "./CategoryList";
import ProductList from "./ProductList";
import Navi from "./Navi";
import alertify from "alertifyjs";
import { Route, Routes } from "react-router-dom";
import NotFound from "./NotFound";
import CartList from "./CartList";
import FormDemo1 from "./FormDemo1";
import FormDemo2 from "./FormDemo2";

class App extends Component {

  state = { currentCategory: "", products: [], cart: [] }

  componentDidMount() {
    this.getProducts();
  }

  changeCategory = category => {
    this.setState({ currentCategory: category.categoryName });

    this.getProducts(category.id);

  };

  getProducts = (categoryId) => {


    let url = "http://localhost:3000/products";
    if (categoryId) {
      url += "?categoryId=" + categoryId;
    }
    fetch(url)
      .then(response => response.json())
      .then(data => this.setState({ products: data }));
  }

  addToCart = (product) => {
    let newCart = this.state.cart;
    var addedItem = newCart.find(c => c.product.id === product.id);
    if (addedItem) {
      console.log("asda")
      addedItem.quantity += 1;
      console.log(addedItem.quantity)
      this.setState({ cart: newCart });

    } else {
      newCart.push({ product: product, quantity: 1 });
      this.setState({ cart: newCart });
    }
    //**** bildirim atma kodu*//
    alertify.success(product.productName + "  ADDED TO CART")

  }

  removeFromCart = (product) => {
    let newCart = this.state.cart;
    var addedItem = newCart.find(c => c.product.id === product.id);
    if (addedItem.quantity > 1) {
      addedItem.quantity -= 1;
      console.log(addedItem.quantity)
      this.setState({ cart: newCart });
    } else if (addedItem.quantity === 1) {
      let newCart = this.state.cart.filter(c => c.product.id !== product.id);
      newCart.quantity -= 1;
      this.setState({ cart: newCart })

    }
    alertify.error(product.productName + "  REMOVED TO CART");
    // aşağıdaki kod sepetteki o ürünün hepsini siliyor yukarda yaptığım ile 1 adet ürün silmekteyim

    //let newCart = this.state.cart.filter(c=>c.product.id!==product.id);
    //newCart.quantity -= 1;
    //this.setState({cart:newCart})
  }


  render() {

    return (
      <div>
        <Container>

          <Navi removeFromCart={this.removeFromCart} cart={this.state.cart} />


          <Row>
            <Col>
              <CategoryList currentCategory={this.state.currentCategory} changeCategory={this.changeCategory} title="Category List"></CategoryList>
            </Col>

            {/* aşağıdaki routures  işlemi sayfa yönlendirmeleri içindiir.  */}
            <Col>
              <Routes>
                <Route exact path="/" element={
                  <ProductList
                  
                    products={this.state.products}
                    addToCart={this.addToCart}
                    currentCategory={this.state.currentCategory}
                    title="Category List"></ProductList>
                 } />
                <Route exact path="/cart" element={<CartList 
                
                 cart={this.state.cart}
                 removeFromCart={this.removeFromCart}
               

                />} />
                <Route exact path="/form1" element={<FormDemo1 />} />
                <Route exact path="/form2" element={<FormDemo2 />} />
                <Route exact path="*" element={<NotFound />} />
              </Routes>


            </Col>
          </Row>

        </Container>

      </div>
    );

  }

}

export default App;
