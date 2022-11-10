import { useContext } from 'react'

import {ShoppingIcon, CartIconContainer, ItemCount} from './cart-icon.styles.jsx'

import { CartContext } from '../../contexts/cart.contex'

const CartIcon = () => {
    const {isCartOpen, setIsCartOpen, cartCount} = useContext(CartContext)

    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen)

    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIcon/>
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon