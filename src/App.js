import {Component} from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  addCartItem = product => {
    const {cartList} = this.state
    const productObject = cartList.find(eachOne => eachOne.id === product.id)
    if (productObject) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachOne => {
          if (eachOne.id === product.id) {
            const updatedQuantity = eachOne.quantity + product.quantity
            return {...eachOne, quantity: updatedQuantity}
          }
          return eachOne
        }),
      }))
    } else {
      this.setState({cartList: [...cartList, product]})
    }
  }

  deleteCartItem = id => {
    const {cartList} = this.state
    const filteredArray = cartList.filter(eachOne => eachOne.id !== id)
    this.setState({cartList: filteredArray})
  }

  IncrementCartItemCount = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachOne => {
        if (id === eachOne.id) {
          const updatedQuantity = eachOne.quantity + 1
          return {...eachOne, quantity: updatedQuantity}
        }
        return eachOne
      }),
    }))
  }

  DecrementCartItemCount = id => {
    const {cartList} = this.state
    const productObject = cartList.find(eachOne => eachOne.id === id)

    if (productObject.quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachOne => {
          if (id === eachOne.id) {
            const updatedQuantity = eachOne.quantity - 1
            return {...eachOne, quantity: updatedQuantity}
          }
          return eachOne
        }),
      }))
    } else {
      this.deleteCartItem(id)
    }
  }

  removeAll = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state

    return (
      <BrowserRouter>
        <CartContext.Provider
          value={{
            cartList,
            addCartItem: this.addCartItem,
            deleteCartItem: this.deleteCartItem,
            removeAll: this.removeAll,
            IncrementCartItemCount: this.IncrementCartItemCount,
            DecrementCartItemCount: this.DecrementCartItemCount,
          }}
        >
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/products" component={Products} />
            <ProtectedRoute
              exact
              path="/products/:id"
              component={ProductItemDetails}
            />
            <ProtectedRoute exact path="/cart" component={Cart} />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="not-found" />
          </Switch>
        </CartContext.Provider>
      </BrowserRouter>
    )
  }
}

export default App
