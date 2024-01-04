const nodemailer = require('nodemailer');

function sendEmail(req, res, next){
    console.log('email sent');

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'site.torontobd.monastery@gmail.com',
          //pass: '123456Monastery'
          pass: 'zhmw vchq jeed pvni'
        }
    });

    const mailOptions = {
        from: 'site.torontobd.monastery@gmail.com',
        to: 'chapalbuet9@gmail.com', // Replace with recipient email address
        subject: req.body.subject,
        text: `
          Name: ${req.body.name}
          Email: ${req.body.email}
          Message: ${req.body.message}
        `
    };

    console.log(mailOptions)

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          res.status(500).send('Error sending email');
        } else {
          console.log('Email sent:', info.response);
          res.status(200).send('Email sent successfully');
        }
    });

}

module.exports = {sendEmail};