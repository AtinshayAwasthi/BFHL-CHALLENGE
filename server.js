const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

// POST Endpoint - `/bfhl`
app.post("/bfhl", (req, res) => {
    const { data } = req.body;

    if (!data || !Array.isArray(data)) {
        return res.status(400).json({ is_success: false, message: "Invalid input format" });
    }

    const numbers = data.filter((item) => !isNaN(item)); // Extract numbers
    const alphabets = data.filter((item) => isNaN(item)); // Extract alphabets

    // Find highest alphabet (case insensitive)
    const highest_alphabet = alphabets.length > 0 ? [alphabets.sort((a, b) => b.localeCompare(a, undefined, { sensitivity: 'base' }))[0]] : [];

    res.json({
        is_success: true,
        user_id: "your_fullname_ddmmyyyy",
        email: "your_college_email@example.com",
        roll_number: "your_roll_number",
        numbers,
        alphabets,
        highest_alphabet
    });
});

// GET Endpoint - `/bfhl`
app.get("/bfhl", (req, res) => {
    res.json({ operation_code: 1 });
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
