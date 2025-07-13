const nodemailer = require('nodemailer');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, '../public')));

// Handle booking form POST
app.post('/api/book', async (req, res) => {
    const { name, email, date, time } = req.body;
    console.log('Booking received:', { name, email, date, time });

    // Set up transporter (use your real email and app password)
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'impactfuljane416@gmail.com',
            pass: 'bjgn fiwl woaq oggh'
        }
    });

    // Email options
    let mailOptions = {
        from: 'impactfuljane416@gmail.com',
        to: 'impactfuljane416@gmail.com', // or any email you want to receive notifications at
        subject: 'New Booking Received',
        text: `New booking from ${name} (${email}) for ${date} at ${time}.`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: 'Booking successful! We have received your request.' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.json({ success: false, message: 'Booking received, but failed to send notification email.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});