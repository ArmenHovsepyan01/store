import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '',
        pass: ''
    }
});

async function sendRegistrationVerificationMail(email){
        const mailOptions = {
            from: "",
            to: email,
            subject: 'Registration Confirmation',
            text: 'Thank you for registering!'
        }

        try {
            await transporter.sendMail(mailOptions);
            console.log('Registration confirmation email sent.');
        } catch (error) {
            console.error('Error sending registration confirmation email:', error);
            throw new Error('Failed to send registration confirmation email.');
        }
    }

export default sendRegistrationVerificationMail;