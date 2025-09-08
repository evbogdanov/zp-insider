const express = require('express');
const cors = require('cors');
const { getSalaryForVacancyTitle } = require('./deepseek');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'alive' });
});

app.post('/salary', async (req, res) => {
    const { vacancyTitle } = req.body;

    if (!vacancyTitle) {
        return res.status(400).json({ error: 'vacancyTitle is required' });
    }

    const salary = await getSalaryForVacancyTitle(vacancyTitle);

    res.status(200).json({ salary, vacancyTitle });
});

app.listen(PORT, () => {
    console.log(`Server is running: http://localhost:${PORT}`);
});
