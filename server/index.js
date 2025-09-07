const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'alive' });
});

app.get('/salary', (req, res) => {
    res.status(200).json({ ok: true });
});

app.listen(PORT, () => {
    console.log(`Server is running: http://localhost:${PORT}`);
});
