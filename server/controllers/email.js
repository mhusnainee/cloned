const nodemailer = require("nodemailer");

let transport = nodemailer.createTransport({
  host: "smtp.zoho.com",
  secure: true,
  port: 465,
  auth: {
    user: "noreply.ems@synapsify.tech",
    pass: "w?Sfa1pj",
  },
});

const sendEmailNotification = async (data) => {
  const mailOptions = {
    from: "noreply.ems@synapsify.tech", // sender address
    to: data.email,
    subject: "test", // Subject line
    html: `<p>hi ${data.username}, Use these credentials to login to EMS portal <br>email: ${data.email} <br>password: ${data.password} <br>
    </p>`, // plain text body
  };
  let result = await transport.sendMail(mailOptions);

  return result;
};

const send_docChanges_mail = async (req, res) => {
  const mailOptions = {
    from: "noreply.ems@synapsify.tech", // sender address
    to: req.body.email,
    subject: "Document Changes", // Subject line
    html: req.body.mailtext, // plain text body
  };

  await transport
    .sendMail(mailOptions)
    .then((response) => {
      res.status(200).json({ sent: true });
    })
    .catch((err) => {
      return res.json({
        message: err,
      });
    });
};

const send_leave_requestmsg = async (email, receivers, leaveBody) => {
  const mailOptions = {
    from: '"EMS" <noreply.ems@synapsify.tech>', // sender address
    to: receivers,
    replyTo: email,
    subject: `leave request Application`, // Subject line
    html: `${leaveBody}`, // plain text body
  };

  console.log(mailOptions);

  let mail_sent_falg = false;
  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      mail_sent_falg = false;
    } else {
      console.log("email sent");
      mail_sent_falg = true;
      console.log(info.response);
    }
  });
  return mail_sent_falg;
};

module.exports = {
  sendEmailNotification,
  send_docChanges_mail,
  send_leave_requestmsg,
};
