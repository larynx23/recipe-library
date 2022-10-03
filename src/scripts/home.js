const boxDiv = document.querySelector("#receptek.container article.row.mt-3.mb-5").innerHTML;
const filterDiv = document.querySelector("#receptek.container div.dropdown div.dropdown-menu").innerHTML;
var toggledReceipts = [1, 2, 3];

function renderReceipts() {
    const section = document.querySelector('html body main#receptek.container article.row.mt-3.mb-5');
    section.innerHTML = '';
    console.log(toggledReceipts);
    if (toggledReceipts.length !== 0){
        for (const [name, receipt] of Object.entries(receiptData)) {
            if (toggledReceipts.includes(receipt.type)) {
                section.innerHTML += boxDiv
                    .replaceAll('{{ icon }}', receipt.icon)
                    .replaceAll('{{ name_raw }}', name)
                    .replaceAll('{{ name }}', receipt.name)
                    .replaceAll('{{ description }}', receipt.description)
                    .replaceAll('{{ sum_times }}', secsToText(receipt.times[0] + receipt.times[1]))
                    .replaceAll('{{ difficulty }}', difficultyText[receipt.difficulty])
                    .replaceAll('{{ type }}', typeText[receipt.type])
                    .replaceAll('{{ money }}', moneyText[receipt.money]);
            }
        }
    } else {
        section.innerHTML = '<h2 class="text-center my-5" style="color: var(--color-reverse);">Nincs találat :(</h2>'
    }
}

function initFilter() {
    const filterDropdown = document.querySelector("#receptek.container div.dropdown div.dropdown-menu");
    filterDropdown.innerHTML = "";
    for (const [num, display] of Object.entries(typeText)) {
        filterDropdown.innerHTML += filterDiv
            .replaceAll("{{ type_num }}", num)
            .replaceAll("{{ type }}", display);
    }
    for (let i = 1; i < 4; i++) {
        document.getElementById(`${i}_check`).checked = true;
    }
    renderReceipts();
};

function toggleFilter(num) {
    console.log(toggledReceipts, num);
    num = Number(num);
    if (toggledReceipts.includes(num)) {
        toggledReceipts.splice(toggledReceipts.indexOf(num), 1);
    } else {
        toggledReceipts.push(num);
    }
    renderReceipts();
}

initFilter();
