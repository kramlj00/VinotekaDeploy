const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendOrderConfirmationEmail = async ({
  emails,
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
  template,
}) => {
  const msg = {
    to: emails,
    from: {
      email: process.env.SENDGRID_SENDER_MAIL,
      name: process.env.SENDER_EMAIL_NAME || "Vinoteka",
    },
    templateId: template,
    dynamic_template_data: {
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
    },
  };

  await sgMail.sendMultiple(msg);
};

module.exports = { sendOrderConfirmationEmail };
