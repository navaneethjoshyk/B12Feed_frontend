import transporter from "../config/nodemail.js";

const approvalEmail = async (toEmail, firstName, lastName) => {
      // send mail with defined transport object
  return await transporter.sendMail({
    from: "lin.chenxi14@gmail.com",
    to: toEmail, // list of receivers
    subject: "Org Approval", // Subject line
    text: `Hello ${firstName} ${lastName}, Your organization has been approved please go to link ....`, // plain text body
  });
}


export {
    approvalEmail
};