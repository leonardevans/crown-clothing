import { createContext, useState, useEffect } from "react";

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

export const  CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    total: 0
})

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [cartItems, setCartItems ] = useState([])
    const [cartCount, setCartCount] = useState(0)
    const [cartTotal, setCartTotal] = useState(0)


    useEffect(() => {
        const newCartCount = cartItems.reduce(
            (cartCount, cartItem) => 
            cartCount+=cartItem.quantity, 0
            )
            setCartCount(newCartCount)
    }, [cartItems])

    useEffect(() => {
        const newCartTotal = cartItems.reduce(
            (total, cartItem) => 
            total+=cartItem.quantity* cartItem.price, 0
            )
            setCartTotal(newCartTotal)
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd))
    }

    const removeItemFromCart = (productToRemove) => {
        setCartItems(removeCartItem(cartItems, productToRemove))
    }

    const clearItemFromCart = (productToClear) => {
        setCartItems(clearCartItem(cartItems, productToClear))
    }

    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount, removeItemFromCart, clearItemFromCart, cartTotal}


    return(
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}