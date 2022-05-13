const { sendProductAddConfirmationEmail } = require("./sendgrid");

const notifyUserOnAddCreation = async (userEmail) => {
  const subject = "Proizvod uspješno oglašen";
  const message = "Čestitamo, uspješno ste oglasili Vaš proizvod!";

  await sendProductAddConfirmationEmail({
    emails: [userEmail],
    subject,
    message,
    template: process.env.SENDGRID_PRODUCT_ADD_NOTIFICATION_MAIL_TEMPLATE,
  });
};

module.exports = { notifyUserOnAddCreation };
