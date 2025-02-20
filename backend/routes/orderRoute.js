import express from 'express'
import { placeOrder, allOrders, userOrders, updateStatus, trackOrder} from '../controllers/orderController.js'
import  adminAuth  from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router();

// admin features
orderRouter.post('/list', adminAuth, allOrders);
orderRouter.post('/status', adminAuth, updateStatus);

// payment features
orderRouter.post('/place', authUser, placeOrder);
// orderRouter.post('/stripe', authUser, placeOrderStripe);
// orderRouter.post('/razorpay', authUser, placeOrderRazorpay);

// user features
orderRouter.post('/userorders', authUser, userOrders);
orderRouter.post('/trackorder', authUser, trackOrder);

// // verify payment
// orderRouter.post('/verifystripe',authUser, verifyStripe);

export default orderRouter;