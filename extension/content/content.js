console.log('Loading content script...');

function makeRequest() {
    fetch('http://localhost:3000/salary', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })
        .then((res) => res.json())
        .then((data) => console.log('Server responded:', data))
        .catch((err) => console.error('Server error:', err));
}

function makeButton() {
    const btn = document.createElement('button');

    btn.id = 'zp-insider-button';
    btn.textContent = 'Узнать у нейросети';
    btn.style.padding = '6px 12px';
    btn.style.margin = '10px';
    btn.style.cursor = 'pointer';
    btn.style.borderRadius = '6px';
    btn.style.background = '#4CAF50';
    btn.style.color = 'white';
    btn.style.border = 'none';
    btn.style.fontSize = '14px';

    btn.addEventListener('click', () => {
        makeRequest();
    });

    return btn;
}

function main() {
    // Selector for unknown salary
    const salarySelector = '.vacancy-title > span';
    const salaryElem = document.querySelector(salarySelector);

    if (!salaryElem) {
        console.log('Salary element not found');
        return;
    }

    const btn = makeButton();

    salaryElem.after(btn);
}

if (document.readyState === 'loading') {
    console.log('Document is loading');
    document.addEventListener('DOMContentLoaded', main);
} else {
    console.log('Can call content script immediately');
    main();
}
