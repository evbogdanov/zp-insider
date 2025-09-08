const API_KEY = process.env.DEEPSEEK_API_KEY;
const API_URL = 'https://api.deepseek.com/v1/chat/completions';
const MAX_TOKENS = 300;
const TEMPERATURE = 0.7;
const VACANCY_TITLE_PLACEHOLDER = '{{vacancyTitle}}';
const PROMPT = `Есть такая вакансия: ${VACANCY_TITLE_PLACEHOLDER}

Какая может быть зарплата в этой вакансии? Ориентируемся на рынок России. Не нужно развёрнуто отвечать. Интересует только число: примерная зарплата в рублях.`;

async function sendMessageToDeepseek(message) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'deepseek-chat',
                messages: [
                    {
                        role: 'user',
                        content: message,
                    },
                ],
                temperature: TEMPERATURE,
                max_tokens: MAX_TOKENS,
            }),
        });

        if (!response.ok) {
            console.error('Error calling Deepseek API:', response.status);
            return null;
        }

        const data = await response.json();

        return data.choices[0].message.content;
    } catch (error) {
        console.error('Error calling Deepseek API:', error.message);
        return null;
    }
}

async function getSalaryForVacancyTitle(vacancyTitle) {
    const message = PROMPT.replace(VACANCY_TITLE_PLACEHOLDER, vacancyTitle);
    return await sendMessageToDeepseek(message);
}

module.exports = {
    getSalaryForVacancyTitle,
};
