const { sendOrderConfirmationEmail } = require("./sendgrid");

const notifyUserOnOrderCreation = async (
  createdOrderDetails,
  shippingAddress,
  user,
  priceDetails
) => {
  const userEmail = shippingAddress.email;
  const subject = "Potvrda o primitku narudžbe";
  const orderNumber = `${createdOrderDetails.id}`;
  const fullName = user.name;
  const address = `${shippingAddress.address}, ${shippingAddress.zip} ${shippingAddress.city}`;
  const phoneNumber = shippingAddress.phoneNumber;
  const paymentMethod = createdOrderDetails.payment_method;
  const subtotal = `${priceDetails.itemsPrice} HRK`;
  const tax = `${priceDetails.taxPrice} HRK`;
  const shipping = `${priceDetails.shippingPrice} HRK`;
  const total = `${priceDetails.totalPrice} HRK`;

  await sendOrderConfirmationEmail({
    emails: [userEmail],
    subject,
    orderNumber,
    fullName,
    address,
    phoneNumber,
    paymentMethod,
    subtotal,
    tax,
    shipping,
    total,
    template: process.env.SENDGRID_NOTIFICATION_MAIL_TEMPLATE,
  });
};

module.exports = { notifyUserOnOrderCreation };
