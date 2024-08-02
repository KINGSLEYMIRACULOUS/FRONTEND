const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/bfhl', (req, res) => {
    const data = req.body.data || [];

    if (!Array.isArray(data)) {
        return res.status(400).json({
            is_success: false,
            error: 'Invalid data format'
        });
    }

    const numbers = data.filter(item => !isNaN(item)).map(Number);
    const alphabets = data.filter(item => /^[A-Za-z]+$/.test(item));
    const highestAlphabet = alphabets.length > 0 ? [alphabets.reduce((max, current) => current.toUpperCase() > max.toUpperCase() ? current : max)] : [];

    res.json({
        is_success: true,
        user_id: 'john_doe_17091999',
        email: 'john@xyz.com',
        roll_number: 'ABCD123',
        numbers,
        alphabets,
        highest_alphabet: highestAlphabet
    });
});

app.get('/bfhl', (req, res) => {
    res.json({
        operation_code: 1
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
