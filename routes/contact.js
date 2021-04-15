const express = require("express"),
  router = express.Router(),
  nodemailer = require("nodemailer");

// Contact Route
router.get("/contact", (req, res) => {
  res.render("contact");
});

// POST route from contact/quote form
router.post("/contact/send", (req, res) => {
  const services = `
  <h2>CUSTOMER INFORMATION:</h2>
  <hr>
  <p>
  Full Name: ${req.body.firstName} ${req.body.lastName}
  <br>
  Email: ${req.body.email}
  <br>
  Phone: ${req.body.inputPhone}
  <br>
  Address: ${req.body.inputAddress}
  <br>
  Address 2: ${req.body.inputAddress2}
  <br>
  City: ${req.body.inputCity}
  <br>
  State: ${req.body.inputState}
  <br>
  Zip: ${req.body.inputZip}
  <br>
  Do you have a gate: ${req.body.gate}
  <br>
  Sprinkler System: ${req.body.sprinklerSelect}
  </p>
  <h2>SERVICES REQUESTED:</h2>
  <hr>
  <ul>
    ${req.body.mowing ? `<li>Mowing</li>` : ""}
    ${req.body.fertilizing ? `<li>Fertilizing</li>` : ""}
    ${req.body.weedControl ? `<li>Weed Control</li>` : ""}
    ${req.body.springFallCleanup ? `<li>Spring/Fall Cleanup</li>` : ""}
    ${req.body.edging ? `<li>Edging</li>` : ""}
    ${req.body.aerating ? `<li>Aerating</li>` : ""}
    ${req.body.sprinklerSystem ? `<li>Sprinkler System</li>` : ""}
    ${req.body.pestControl ? `<li>Perimeter Pest Control</li>` : ""}
  </ul>
  `;
  // Instantiate the SMTP server
  const smtpTrans = nodemailer.createTransport({
    host: process.env.MAILHOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL,
      pass: process.env.MAILEPW,
    },
  });

  // Specify what the email will look like
  const mailOpts = {
    from: '"CONTACT FORM ✉️" <bob@bob.com>',
    to: "bob@bob.com",
    replyTo: `${req.body.email}`,
    priority: "high",
    subject: "❗ New Contact Form Submitted",
    text: `CUSTOMER INFORMATION
----------------------------
Full Name: ${req.body.firstName} ${req.body.lastName}
Email: ${req.body.email}
Phone: ${req.body.inputPhone}
Address: ${req.body.inputAddress}
Address 2: ${req.body.inputAddress2}
City: ${req.body.inputCity}
State: ${req.body.inputState}
Zip: ${req.body.inputZip}
Do you have a gate: ${req.body.gate}
Sprinkler System: ${req.body.sprinklerSelect}
----------------------------`,
    html: services,
  };

  // Attempt to send email
  smtpTrans.sendMail(mailOpts, (error, response) => {
    if (error) {
      console.log("Failed", error);
      req.flash("error", "There was an issue sending, please try again!");
      res.redirect("back");
    } else {
      console.log("Success", response);
      req.flash("success", "Your message has been sent successfully!");
      res.redirect("back");
    }
  });
});

module.exports = router;
