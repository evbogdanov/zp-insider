document.addEventListener('DOMContentLoaded', function () {
    const actionBtn = document.getElementById('actionBtn');

    actionBtn.addEventListener('click', async function () {
        try {
            const response = await fetch('http://localhost:3000/salary');
            const data = await response.json();
            console.log('Server response:', data);
            console.log('Request successful!', {
                status: response.status,
                data,
            });
        } catch (error) {
            console.error('Request failed:', error);
            console.log('Error details:', {
                message: error.message,
                type: error.name,
            });
        }
    });

    console.log('ZP Insider popup loaded successfully!');
});
