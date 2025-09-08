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
    btn.style.border = '0';
    btn.style.margin = '0 0 0 8px';
    btn.style.padding = '10px 12px';
    btn.style.cursor = 'pointer';
    btn.style.display = 'inline-block';
    btn.style.boxSizing = 'border-box';
    btn.style.borderRadius = '12px';
    btn.style.backgroundColor = '#e8f9ec';
    btn.style.color = '#0dc267';
    btn.style.fontWeight = '500';
    btn.style.fontSize = '14px';
    btn.style.outline = 'none';

    btn.addEventListener('mouseenter', () => {
        btn.style.backgroundColor = '#f0fbf3';
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.backgroundColor = '#e8f9ec';
    });

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
