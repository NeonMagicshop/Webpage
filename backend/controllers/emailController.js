import orderModel from '../models/orderModel.js'
import nodemailer from 'nodemailer'

// send mail for order confirmation

const sendNewOrderInfoAdmin = async () => {
    try {
    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PASSWORD
        }
    })

    const emailContentAdmin = "A new order has been placed, please check admin panel for more info"
        
    const email_config = {
        from: process.env.NODEMAILER_EMAIL,
        to: 'lumeonpk@gmail.com',
        subject: 'New order',
        html: emailContentAdmin,    
    }

    const info = await transporter.sendMail(email_config); 
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info)); 
    
} catch (error) {
    console.error('Error sending email:', error);

    if (error.response && error.response.body && error.response.body.errors) {
        for (const err of error.response.body.errors) {
          if (err.message.includes('invalid address') || 
              err.message.includes('recipient address rejected') || 
              err.message.includes('550 address not found')) {
            console.error(`Invalid email address: ${email}`); 
            // Notify admin or log the error 
            // Optionally, display an error message to the user 
            // (e.g., "Invalid email address. Please check and try again.") 
          }
        }
      } 
}

}

const sendOrderConfirmationEmail = async (orderId) => {
    try {
        const order = await orderModel.findOne({orderId: orderId});
        if (!order) {
            console.log(`Order with ID ${orderId} not found.`);
            return; 
        }
        const { address: { firstName, lastName, email } } = order;

        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.NODEMAILER_EMAIL,
                pass: process.env.NODEMAILER_PASSWORD
            }
        })

        const emailContentCustomer = `
          <p>Dear ${firstName} ${lastName},</p>
          <p>Thank you for your order! Your order has been placed successfully.</p>
          <p>We at Neon Magic welcome you to the Neon Magic family, we appreciate for your trust in us,
          and can't wait for you to see the magic come to light!</p>
          <p>Use the following Order ID for updates on the stage of your order</p>
          <p><strong>Order Number:</strong> ${orderId}</p> 
          <p>You can view your order details here: <a href="your-order-tracking-url">Order Tracking Link</a></p>
          <p>If you have any questions regarding your order, feel free to reach us out at neonmagic@gmail.com or +92-336-563-5253</p> 
          <p>Warm Regards,</p>
          <p>The NeonMagic Family</p>
        `;
        
        const email_config = {
            from: process.env.NODEMAILER_EMAIL,
            to: email,
            subject: 'Order Confirmation',
            html: emailContentCustomer,    
        }
        
        sendNewOrderInfoAdmin();
        const info = await transporter.sendMail(email_config); 
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info)); 
        
    } catch (error) {
        console.error('Error sending email:', error);

        if (error.response && error.response.body && error.response.body.errors) {
            for (const err of error.response.body.errors) {
              if (err.message.includes('invalid address') || 
                  err.message.includes('recipient address rejected') || 
                  err.message.includes('550 address not found')) {
                console.error(`Invalid email address: ${email}`); 
                // Notify admin or log the error 
                // Optionally, display an error message to the user 
                // (e.g., "Invalid email address. Please check and try again.") 
              }
            }
          } 
    }
}

const orderUpdateStautsEmail = async (orderId, status) => {
    try {
        const order = await orderModel.findOne({_id: orderId});
        if (!order) {
            console.log(`Order with ID ${orderId} not found.`);
            return; 
        }
        
        const { address: { firstName, lastName, email } } = order;

        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.NODEMAILER_EMAIL,
                pass: process.env.NODEMAILER_PASSWORD
            }
        })

        const updateStatusContent = `
        <p>Dear ${firstName} ${lastName},</p>
        <p>Good news! Your order is now ${status}.</p>
        <p>We're excited to get your Neon Magic creation on its way to you.  We appreciate your patience!</p>
        <p>Use your Order ID for updates on the stage of your order</p>
        <p>You can view your order details here: <a href="your-order-tracking-url">Order Tracking Link</a></p>
        <p>If you have any questions regarding your order, feel free to reach us out at neonmagic@gmail.com or +92-336-563-5253</p> 
        <p>Warm Regards,</p>
        <p>The NeonMagic Family</p>
        `;

        const deliveredStatusContent = `
        <p>Dear ${firstName} ${lastName},</p>
        <p>Your order has been delivered! We hope you're enjoying your new Neon Magic product.</p>
        <p>We're thrilled you've joined the Neon Magic family, we hope to see you again!</p>
        <p>You can view your order details here: <a href="your-order-tracking-url">Order Tracking Link</a></p>
        <p>If you have any questions regarding your order, feel free to reach us out at neonmagic@gmail.com or +92-336-563-5253</p> 
        <p>Warm Regards,</p>
        <p>The NeonMagic Family</p>`
        
        const email_config = {
            from: process.env.NODEMAILER_EMAIL,
            to: email,
            subject: 'Order Status Update',
            html: status === 'Delivered' ? deliveredStatusContent : updateStatusContent,    
        }

        const info = await transporter.sendMail(email_config); 
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info)); 
        
    } catch (error) {
        console.error('Error sending email:', error);

        if (error.response && error.response.body && error.response.body.errors) {
            for (const err of error.response.body.errors) {
              if (err.message.includes('invalid address') || 
                  err.message.includes('recipient address rejected') || 
                  err.message.includes('550 address not found')) {
                console.error(`Invalid email address: ${email}`); 
                // Notify admin or log the error 
                // Optionally, display an error message to the user 
                // (e.g., "Invalid email address. Please check and try again.") 
              }
            }
          } 
    }
}

export {sendOrderConfirmationEmail, orderUpdateStautsEmail};