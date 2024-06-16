const nodemailer = require('nodemailer');
module.exports.rootHandler = async () => {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Hello from the root endpoint!' }),
    };
  };
  
  

    module.exports.sendEmail = async (event) => {
        try {
          const { receiver_email, subject, body_text } = JSON.parse(event.body);
      
          if (!receiver_email || !subject || !body_text) {
            return {
              statusCode: 400,
              body: JSON.stringify({ message: 'Missing required fields' }),
            };
          }
      
          // Create a transporter object using Gmail SMTP transport
          let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.GMAIL_USER,
              pass: process.env.GMAIL_PASS,
            },
          });
      
          // Define email options
          let mailOptions = {
            from: `"Serverless Email" <${process.env.GMAIL_USER}>`,
            to: receiver_email,
            subject: subject,
            text: body_text,
          };
      
          // Send the email
          await transporter.sendMail(mailOptions);
      
          return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Email sent successfully' }),
          };
        } catch (error) {
          console.error('Error sending email:', error);
          return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error', error: error.message }),
          };
        }
    
  };
  



