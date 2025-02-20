import mongoose from 'mongoose'

const orderSchema = mongoose.Schema({
    orderId: {type: String, required: true, unique: true},
    userId: {type: String},
    guestOrderId: {type: String}, 
    items: {type: Array, required: true},
    amount: {type: Number, required: true},
    address: {type: Object, required: true},
    status: {type: String, required: true, default: 'Order Placed'},
    paymentMethod: {type: String, required: true},
    payment: {type: Boolean, required: true, default: false},
    date: {type: Number, required: true}
})

const orderModel = mongoose.model.order || mongoose.model('orders', orderSchema);

export default orderModel;