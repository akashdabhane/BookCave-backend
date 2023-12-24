const nodemailer = require('nodemailer');
const emaildb = require('../model/email'); 


exports.sendEmail = (req, res) => {
    const { fullname, phone, from, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MY_EMAIL,
            pass: process.env.MY_EMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from,
        to: process.env.MY_EMAIL,
        subject,
        message,
    };

    // transporter.sendMail(mailOptions, (error, info) => {
    //     if (error) {
    //         return res.status(500).send(error.toString());
    //     }

        const emaildb = new emaildb({
            fullname, 
            phone,
            email: from,
            subject,
            message,
        })

        emaildb.save(); 

        res.status(200).send('Email sent: ' + info.response);
    // });
}

