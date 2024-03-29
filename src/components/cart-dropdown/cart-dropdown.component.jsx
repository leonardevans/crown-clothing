import { useCallback, useState, useMemo } from 'react'

import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import {CartDropdownContainer, EmptyMessage, CartItems} from './cart-dropdown.styles.jsx'

import Button from "../button/button.component"
import CartItem from '../cart-item/cart-item.component'
import { selectCartItems } from '../../store/cart/cart.selector'

const CartDropdown = () => {
    const cartItems = useSelector(selectCartItems)
    const navigate = useNavigate()

    const gotToCheckout = useCallback(() => {        
        navigate('/checkout')
    }, [])

    return(
        <CartDropdownContainer>
            <CartItems>
                {
                    cartItems.length 
                    ? cartItems.map(
                        item => <CartItem key={item.id} cartItem={item} />
                    ) 
                    :
                    <EmptyMessage>Your cart is empty</EmptyMessage>
                }
            </CartItems>

            <Button onClick={gotToCheckout}>Go to Checkout</Button>
        </CartDropdownContainer>
    )
}

export default CartDropdown