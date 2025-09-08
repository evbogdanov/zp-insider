console.log('Loading content script...');

const IDS = {
    btn: 'zp-insider-button',
    loader: 'zp-insider-loader',
};

const MESSAGES = {
    askAI: 'Узнать у нейросети',
    loading: 'Нейросеть думает',
    emoji: '🤑',
    serverError: 'Ошибка сервера',
};

function makeButton(onClick) {
    const btn = document.createElement('button');

    btn.id = IDS.btn;
    btn.textContent = MESSAGES.askAI;
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

    btn.addEventListener('click', onClick);

    return btn;
}

function makeLoader() {
    const loader = document.createElement('div');

    loader.id = IDS.loader;
    loader.textContent = MESSAGES.emoji;
    loader.style.display = 'inline-block';
    loader.style.fontSize = '24px';
    loader.style.margin = '0 0 0 8px';

    loader.animate(
        [{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }],
        {
            duration: 1000,
            iterations: Infinity,
            easing: 'linear',
        }
    );

    return loader;
}

function hideButton() {
    const btn = document.getElementById(IDS.btn);
    btn.style.display = 'none';
}

function hideLoader() {
    const loader = document.getElementById(IDS.loader);
    loader.style.display = 'none';
}

function main() {
    // Selector for unknown salary
    const salarySelector = '.vacancy-title > span';
    const salaryElem = document.querySelector(salarySelector);

    if (!salaryElem) {
        console.log('Salary element not found');
        return;
    }

    const handleBtnClick = () => {
        salaryElem.textContent = MESSAGES.loading;
        hideButton();

        const loader = makeLoader();
        salaryElem.after(loader);

        fetch('http://localhost:3000/salary', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log('Server responded:', data);
                hideLoader();
                salaryElem.textContent = data.salary;
            })
            .catch((err) => {
                console.error('Server error:', err);
                hideLoader();
                salaryElem.textContent = MESSAGES.serverError;
            });
    };

    const btn = makeButton(handleBtnClick);
    salaryElem.after(btn);
}

if (document.readyState === 'loading') {
    console.log('Document is loading');
    document.addEventListener('DOMContentLoaded', main);
} else {
    console.log('Can call content script immediately');
    main();
}
