import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.utils";

export const setIsCartOpen = (isCartOpen) => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, isCartOpen)

const addCartItem = (cartItems, productToAdd) => {
    //find if cartItems contains productToAdd
    const existingCartItem = cartItems.find(cartItem => cartItem.id === productToAdd.id)

    //If found, increment quantity
    if(existingCartItem){
        return cartItems.map(
            cartItem => 
            cartItem.id === productToAdd.id 
            ? 
            {...cartItem, quantity: cartItem.quantity+1}
            :
            cartItem
            )
    }
    //return new array with modified cartitems/new cart item
    return [...cartItems, {...productToAdd, quantity: 1}]
}

const removeCartItem = (cartItems, productToRemove) => {
    //find if cartItems contains productToRemove
    const existingCartItem = cartItems.find(cartItem => cartItem.id === productToRemove.id)

    //check if quantity is equal to 1, if it is remove that item from the cart
    if(existingCartItem.quantity === 1){
        return cartItems.filter(cartItem => cartItem.id !== productToRemove.id)
    }

    //return back cart items with the matching cart item's quantity reduced
    return cartItems.map(
        cartItem => 
        cartItem.id === productToRemove.id 
        ? 
        {...cartItem, quantity: cartItem.quantity-1}
        :
        cartItem
        )
}

const clearCartItem = (cartItems, productToClear) => {
    //remove that item from the cart
    return cartItems.filter(cartItem => cartItem.id !== productToClear.id)
}


export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd)
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}

export const removeItemFromCart = (cartItems, productToRemove) => {
    const newCartItems =removeCartItem(cartItems, productToRemove)
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}

export const clearItemFromCart = (cartItems, productToClear) => {
    const newCartItems = clearCartItem(cartItems, productToClear)
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}