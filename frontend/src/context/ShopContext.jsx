import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios'


export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = 'Rs';
    const sizeUnit = 'feet';
    const delivery_fee = 0;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState('');
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [pathname]);

    const addToCart = async(itemId, size, color, price) => {
        let cartData = structuredClone(cartItems);
        
        if (!size) {
            toast.error("Select Product Size")
            return;
        }

        if (!color) {
            toast.error("Select Product color")
            return;
        }

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                if (cartData[itemId][size][color]) {
                    if (cartData[itemId][size][color][price]){
                        cartData[itemId][size][color][price] += 1;
                    } else {
                        cartData[itemId][size][color][price] = 1;
                    }
                } else {
                    cartData[itemId][size][color] = {};
                    cartData[itemId][size][color][price] = 1;
                }
            }else {
                cartData[itemId][size] = {};
                cartData[itemId][size][color] = {};
                cartData[itemId][size][color][price] = 1;
            }
        }else {
            cartData[itemId] = {};
            cartData[itemId][size] = {};
            cartData[itemId][size][color] = {};
            cartData[itemId][size][color][price] = 1;
        }

        setCartItems(cartData)
        toast.success("Product Added to Cart");

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/add', {itemId, size, color, price}, {headers: {token}})
                // console.log('Item added to cart');
                
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const itemId in cartItems) { 
          for (const size in cartItems[itemId]) {
            for (const color in cartItems[itemId][size]) {
                for(const price in cartItems[itemId][size][color]) {
                    try {
                        if (cartItems[itemId][size][color][price] > 0) {
                            totalCount += cartItems[itemId][size][color][price];
                        }
                    } catch (error) {
                        console.log(error);
                        
                    }
                }
            }
          }
        }
        return totalCount;
      };

    const updateQuantity = async (itemId, size, color, price, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size][color][price] = quantity;
        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/update', {itemId, size, color, price, quantity}, {headers:{token}})
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for(const itemsId in cartItems){
            let itemInfo = products.find(product => product._id === itemsId);
            for(const size in cartItems[itemsId]){
                for(const color in cartItems[itemsId][size]){
                    for(const price in cartItems[itemsId][size][color]) {
                        try {
                            if(cartItems[itemsId][size][color][price] > 0){
                                totalAmount += price * cartItems[itemsId][size][color][price];
                            }
                        } catch (error) {
                            console.log(error);
                        }
                    }
                }
            }
        }  
        return totalAmount; 
    }

    const getProductsData = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/product/list');
            if (response.data.success) {
                setProducts(response.data.products);
            } else {
                toast.error(response.data.message);
            }
            
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    } 

    const getUserCart = async (token) => {
        try {
            const response = await axios.post(backendUrl + '/api/cart/get', {}, {headers: {token}});
            if (response.data.success) {
                setCartItems(response.data.cartData);  
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        getProductsData()
    }, [])

    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'));
            getUserCart(localStorage.getItem('token'));
        }
    }, [token])

    const value = {
        products, currency, sizeUnit, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, setCartItems, addToCart,
        getCartCount, updateQuantity,
        getCartAmount, navigate, backendUrl,
        token, setToken
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;