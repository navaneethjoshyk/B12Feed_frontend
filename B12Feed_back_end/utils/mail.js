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

const needApproval = async (fName, lName, orgName) => {
  // send mail to super admin to approve the new org
  return await transporter.sendMail({
    from: "test@example.com",
    to: "lin.chenxi14@gmail.com",
    subject: "New Organization will need approval",
    text: `Please review ${fName} ${lName}'s ${orgName}`
  })
}


export {
    approvalEmail,
    needApproval
};