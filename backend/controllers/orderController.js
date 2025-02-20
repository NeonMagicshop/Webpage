import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';
import {sendOrderConfirmationEmail, orderUpdateStautsEmail} from './emailController.js';
import Stripe from 'stripe';

// global variables
const currency = 'Rs';
const deliveryCharge = 10;

// // gateway innitialise
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// generate guest user Id
const generateUniqueGuestOrderId = async () => {
    let repeat = true;
    let timeStamp;
    let randomPart;
    let guestId;
    while (repeat){
        timeStamp = Date.now();
        randomPart = Math.random().toString(36).substring(2, 7);
        guestId = `guest-${timeStamp}-${randomPart}`;
        try {
            const order = await orderModel.findOne({guestOrderId: guestId});
            if (!order) {
                repeat = false;
            }
        } catch (error) {
            console.log(error);
        }
    }
    return guestId;
}

// generate unique order Id
const generateUniqueOrderId = async () => {
    let repeat = true;
    let timeStamp;
    let randomPart;
    let orderId;
    while (repeat){
        timeStamp = Date.now();
        randomPart = Math.random().toString(36).substring(2, 7);
        orderId = `order-${timeStamp}-${randomPart}`;
        try {
            const order = await orderModel.findOne({orderId: orderId});
            if (!order) {
                repeat = false;
            }
        } catch (error) {
            console.log(error);
        }
    }
    return orderId;
}

// placing orders using COD
const placeOrder = async (req, res) => {
    try {
        const { items, amount, address } = req.body; 
        const userId = req.body.userId;
        let orderId = await generateUniqueOrderId();
        let guestOrderId = null;
        if (!userId) {
            guestOrderId = await generateUniqueGuestOrderId();
        }

        const orderData = new orderModel({
            orderId,
            userId,
            guestOrderId,
            items,
            amount,
            address,
            paymentMethod: 'COD',
            payment: false,
            date: Date.now()
        });

        const newOrder = new orderModel(orderData); 
        await newOrder.save();

        sendOrderConfirmationEmail(orderId);

        if (userId) { 
            await userModel.findByIdAndUpdate(userId, { cartData: {} }); 
        }
        res.json({success: true, message: 'Order placed successfully'});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

// // placing orders using Stripe
// const placeOrderStripe = async (req, res) => {
//     try {
//         const {userId, items, amount, address} = req.body;
//         const {origin} = req.headers;

//         const orderData = new orderModel({
//             userId,
//             items,
//             amount,
//             address,
//             paymentMethod: 'Stripe',
//             payment: false,
//             date: Date.now()
//         });

//         const newOrder = new orderModel(orderData);
//         newOrder.save();

//         const line_items = items.map((item) => ({
//             price_data: {
//                 currency: currency,
//                 product_data: {
//                     name: item.name
//                 }, 
//                 unit_amount: item.price * 100
//             },
//             quantity: item.quantity
//         }));

//         line_items.push({
//             price_data: {
//                 currency: currency,
//                 product_data: {
//                     name: 'Delivery Charges'
//                 }, 
//                 unit_amount: deliveryCharge * 100
//             },
//             quantity: 1
//         })

//         const session = await stripe.checkout.sessions.create({
//             success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
//             cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
//             line_items,
//             mode: 'payment',
//         });

//         res.json({success: true, session_url: session.url});
//     } catch (error) {
//         console.log(error);
//         res.json({success: false, message: error.message});
//     }
// }

// // verify payment using Stripe
// const verifyStripe = async (req, res) => {
//     const {orderId, success, userId} = req.body;

//     try {
//         if (success === "true") {
//             await orderModel.findByIdAndUpdate(orderId, {payment: true});
//             await userModel.findByIdAndUpdate(userId, {cartData:{}});
//             res.json({success: true, message: 'Payment verified successfully'});
//         } else {
//             await orderModel.findByIdAndDelete(orderId);
//             res.json({success: false, message: 'Payment failed'});
//         }
//     } catch (error) {
//         console.log(error);
//         res.json({success: false, message: error.message});
//     }
// }

// // placing orders using Razorpay
// const placeOrderRazorpay = async (req, res) => {
    
// }

// All orders data for admin panel
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({success: true, orders});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

// User order data for frontend
const userOrders = async (req, res) => {
    try {
        const {userId} = req.body;
        const orders = await orderModel.find({userId});
        res.json({success: true, orders});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

// Track order data for frontend
const trackOrder = async (req, res) => {
    try {
        const {orderId} = req.body;
        const orders = await orderModel.find({orderId});
        res.json({success: true, orders});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

// update order status for admin panel
const updateStatus = async (req, res) => {
    try {
        const {orderId, status} = req.body;
        await orderModel.findByIdAndUpdate(orderId, {status});
        await orderUpdateStautsEmail(orderId, status);
        res.json({success: true, message: 'Order status updated successfully'});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

export { placeOrder, allOrders, userOrders, updateStatus, trackOrder };