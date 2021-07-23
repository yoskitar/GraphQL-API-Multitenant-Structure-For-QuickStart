const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

const { 
    MAIL_HOST,
    MAIL_USER,
    MAIL_PASSWORD
  } = process.env;

exports.sendEmail = async (toEmail, subject, emailText, contextParams) => {

    console.log(__dirname);
    var res = {
        success: false,
        errors:[]
    };
    var transporter = nodemailer.createTransport({
        host: MAIL_HOST,
        port: 465,
        secure: true,
        auth: {
            user: MAIL_USER,
            pass: MAIL_PASSWORD
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
        }
    });
    transporter.use('compile', hbs({
        viewEngine: {
            extName: ".handlebars",
            partialsDir: '/usr/src/utils/views/',
            defaultLayout: false,
        },
        extName: ".handlebars",
        viewPath: '/usr/src/utils/views/'
    }));
    var mailOptions = {
        from: MAIL_USER,
        to: toEmail,
        subject: subject,
        attachments: [{
            filename: 'yourlogo.png',
            path: __dirname +'/views//images/yourlogo.png',
            cid: 'yourlogo'
        },
        {
            filename: 'bg-white-rombo.png',
            path: __dirname +'/views//images/bg-white-rombo.png',
            cid: 'bg_white_rombo'
        },
        {
            filename: 'bee.png',
            path: __dirname +'/views//images/bee.png',
            cid: 'bee'
        },
        {
            filename: 'facebook2x.png',
            path: __dirname +'/views//images/facebook2x.png',
            cid: 'facebook2x'
        },
        {
            filename: 'lock4.png',
            path: __dirname +'/views//images/lock4.png',
            cid: 'lock4'
        },
        {
            filename: 'twitter2x.png',
            path: __dirname +'/views//images/twitter2x.png',
            cid: 'twitter2x'
        }],
        text: emailText,
        template: 'index',
        context: contextParams //{urlToRedirect}
    };
    await transporter.sendMail(mailOptions, function(error, info){
        if (error){
            console.log("error:");
            console.log(error);
            res.errors.push(error.message);
        } else {
            console.log("Email sent");
            res.success = true;
        }
    });

    return res;
};

  