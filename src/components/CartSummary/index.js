import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      let total = 0

      cartList.forEach(product => {
        total += product.price * product.quantity
      })

      return (
        <div className="total-container">
          <h1 className="head">
            Order Total:
            <span>Rs {total}</span>
          </h1>
          <p>{cartList.length} items</p>
          <button className="check-button" type="button">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
