import { CategoryItem } from "../categories/category.types";

import { CART_ACTION_TYPES, CartItem } from "./cart.types";
import { createAction, withMatcher, Action, ActionWithPayload } from "../../utils/reducer/reducer.utils";

const addCartItem = (
    cartItems: CartItem[],
    productToAdd: CategoryItem): CartItem[] => {
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

const removeCartItem = (cartItems: CartItem[], productToRemove: CartItem): CartItem[] => {
    //find if cartItems contains productToRemove
    const existingCartItem = cartItems.find(cartItem => cartItem.id === productToRemove.id)

    //check if quantity is equal to 1, if it is remove that item from the cart
    if(existingCartItem && existingCartItem.quantity === 1){
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

const clearCartItem = (cartItems: CartItem[], productToClear: CartItem): CartItem[] => {
    //remove that item from the cart
    return cartItems.filter(cartItem => cartItem.id !== productToClear.id)
}

export type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean>

export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>

export const setIsCartOpen = withMatcher((isCartOpen: boolean): SetIsCartOpen => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, isCartOpen))

export const setCartItems = withMatcher((cartItems: CartItem[]): SetCartItems => createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems))

export const addItemToCart = (cartItems: CartItem[], productToAdd: CartItem) => {
    const newCartItems = addCartItem(cartItems, productToAdd)
    return setCartItems(newCartItems)
}

export const removeItemFromCart = (cartItems: CartItem[], productToRemove: CartItem) => {
    const newCartItems =removeCartItem(cartItems, productToRemove)
    return setCartItems(newCartItems)
}

export const clearItemFromCart = (cartItems: CartItem[], productToClear: CartItem) => {
    const newCartItems = clearCartItem(cartItems, productToClear)
    return setCartItems(newCartItems)
}