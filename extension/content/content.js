console.log('Loading content script...');

function main() {
    // When no salary:
    // const salaryElem = document.querySelector('.vacancy-title > span');

    // When actually have salary
    const salaryElem = document.querySelector(
        '.vacancy-title [data-qa="vacancy-salary"] > span'
    );

    if (!salaryElem) {
        console.log('Salary element not found');
        return;
    }

    const salaryText = salaryElem.textContent;
    console.log('Salary text', salaryText);
}

if (document.readyState === 'loading') {
    console.log('Document is loading');
    document.addEventListener('DOMContentLoaded', main);
} else {
    console.log('Can call content script immediately');
    main();
}
