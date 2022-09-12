const boxDiv = document.querySelector("html body main#receptek.container article.row.mt-3.mb-5").innerHTML;

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
            .replaceAll('{{ sefServing }}', receipt.defServing)
            .replaceAll('{{ money }}', moneyText[receipt.money])
    }
}

init();