const boxDiv = document.querySelector("#receptek.container article.row.mt-3.mb-5").innerHTML;
const filterDiv = document.querySelector("#receptek.container div.dropdown div.dropdown-menu").innerHTML;

function init() {
    const section = document.querySelector('html body main#receptek.container article.row.mt-3.mb-5');
    section.innerHTML = '';
    for (const [name, receipt] of Object.entries(receiptData)) {
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

function initFilter() {
    const filterDropdown = document.querySelector("#receptek.container div.dropdown div.dropdown-menu");
    filterDropdown.innerHTML = "";
    for (const [num, display] of Object.entries(typeText)) {
        console.log(filterDiv
            .replaceAll("{{ type_num }}", num)
            .replaceAll("{{ type }}", display), filterDiv);
        filterDropdown.innerHTML += filterDiv
            .replaceAll("{{ type_num }}", num)
            .replaceAll("{{ type }}", display);
    }    
};

init();
initFilter();