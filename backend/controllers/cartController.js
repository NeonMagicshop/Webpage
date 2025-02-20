import UserModel from "../models/userModel.js";


// add product to cart
const addToCart = async (req, res) => {
    try {
        const { userId, itemId, size, color, price } = req.body;
        
        const userData = await UserModel.findById(userId);
  
        let cartData = await userData.cartData;

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

        await UserModel.findByIdAndUpdate(userId, {cartData});

        res.json({success: true, message: 'Product added to cart successfully'});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

// update cart data
const updateCart = async (req, res) => {
    try {
        const {userId, itemId, size, color, price, quantity} = req.body;

        const userData = await UserModel.findById(userId);
        let cartData = await userData.cartData;

        cartData[itemId][size][color][price] = quantity;

        await UserModel.findByIdAndUpdate(userId, {cartData});

        res.json({success: true, message: 'Cart updated successfully'});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

// get user cart data
const getUserCart = async (req, res) => {
    try {
        const {userId} = req.body;

        const userData = await UserModel.findById(userId);
        const cartData = await userData.cartData;

        res.json({success: true, cartData: cartData});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

export { addToCart, updateCart, getUserCart };