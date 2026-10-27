
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const sgMail = require("@sendgrid/mail");

dotenv.config();

const app = express();
const PORT = 3000;

// Allow requests from the React frontend.
app.use(
    cors({
        origin:
            process.env.FRONTEND_ORIGIN ||
            "http://localhost:5173",
    })
);

// Read JSON data sent by React.
app.use(express.json());

// Configure SendGrid.
sgMail.setApiKey(process.env.sendgrid_api);

// Health check to confirm the backend is running.
app.get("/api/health", (request, response) => {
    response.status(200).json({
        message: "Backend is running.",
    });
});

// Newsletter subscription API.
app.post("/api/subscribe", async (request, response) => {
    const email =
        typeof request.body?.email === "string"
            ? request.body.email.trim()
            : "";

    // Validate the email address.
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailPattern.test(email)) {
        return response.status(400).json({
            message: "Please enter a valid email address.",
        });
    }

    // Prepare the welcome email.
    const message = {
        to: email,
        from: process.env.sendgrid_from_email,
        subject: "Welcome to DEV@Deakin!",
        text: "Thank you for subscribing to DEV@Deakin.",
        html: `
            <h1>Welcome to DEV@Deakin!</h1>
            <p>Thank you for subscribing to our newsletter.</p>
        `,
    };

    try {
        // Send the email using SendGrid.
        const result = await sgMail.send(message);

        // Log the actual SendGrid response status.
        console.log(
            "SendGrid Status Code:",
            result[0].statusCode
        );

        return response.status(200).json({
            message:
                "Thank you for subscribing! Please check your email.",
        });
    } catch (error) {
        console.error(
            "SendGrid error:",
            error.response?.body || error.message
        );

        return response.status(500).json({
            message:
                "Unable to send the welcome email. Please try again later.",
        });
    }
});

// Start the Express server.
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}.`);
});
