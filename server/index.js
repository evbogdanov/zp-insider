const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'alive' });
});

app.get('/salary', (req, res) => {
    res.status(200).json({ ok: true, data: 'TODO' });
});

app.listen(PORT, () => {
    console.log(`Server is running: http://localhost:${PORT}`);
});
