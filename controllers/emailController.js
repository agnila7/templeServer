const nodemailer = require('nodemailer');

function sendEmail(req, res, next){

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'site.torontobd.monastery@gmail.com',
          pass: 'zhmw vchq jeed pvni'
        }
    });

    const mailOptions = {
        from: 'site.torontobd.monastery@gmail.com',
        to: 'admin@bso-toronto.ca',
        subject: req.body.subject,
        text: `
          Name: ${req.body.name}
          Email: ${req.body.email}
          Message: ${req.body.message}
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          res.status(500).send({msg: 'Error sending email:-'+ error});
        } else {
          res.status(200).send({msg: 'Email sent successfully'});
        }
    });

}

module.exports = {sendEmail};