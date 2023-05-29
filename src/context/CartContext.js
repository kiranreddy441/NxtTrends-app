import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  addCartItem: () => {},
  deleteCartItem: () => {},
  removeAll: () => {},
  IncrementCartItemCount: () => {},
  DecrementCartItemCount: () => {},
})

export default CartContext
