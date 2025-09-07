document.addEventListener('DOMContentLoaded', function () {
    const actionBtn = document.getElementById('actionBtn');

    let counter = 0;

    actionBtn.addEventListener('click', function () {
        console.log('Button clicked!', { counter: counter++ });
    });

    console.log('ZP Insider popup loaded successfully!');
});
