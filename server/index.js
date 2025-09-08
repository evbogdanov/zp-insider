const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'alive' });
});

app.post('/salary', (req, res) => {
    const { vacancyTitle } = req.body;

    if (!vacancyTitle) {
        return res.status(400).json({ error: 'vacancyTitle is required' });
    }

    res.status(200).json({ salary: 'TODO: implement later', vacancyTitle });
});

app.listen(PORT, () => {
    console.log(`Server is running: http://localhost:${PORT}`);
});
