const securities = [
    {
        name: "Microsoft Corporation",
        symbol: "MSFT",
        price1: 238.699,
        price2: 331.83,
        return: 74.13,
    },
    {
        name: "Apple Inc",
        symbol: "AAPL",
        price1: 129.553,
        price2: 188.61,
        return: 86.61,
    },

    {
        name: "Amazoncom Inc",
        symbol: "AMZN",
        price1: 84,
        price2: 127.13,
        return: 97.56,
    },
    {
        name: "Alphabet Inc",
        symbol: "GOOG",
        price1: 88.73,
        price2: 116.87,
        return: 60.26,
    },


];

function createSecuritiesTable() {
    const tableBody = document.createElement("tbody");

    for (let i = 0; i < securities.length; i++) {
        const security = securities[i];
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${security.name}</td>
        <td>${security.symbol}</td>
        <td>$${security.price1}</td>
        <td>$${security.price2}</td>
        <td>${security.return}</td>
      `;
        tableBody.appendChild(row);
    }

    const securitiesTable = document.getElementById("securitiesTable");
    securitiesTable.appendChild(tableBody);
}

createSecuritiesTable();

const portfolioData = [
    { name: "MSFT", returns: [57.56, 42.53, 52.48, -28.19, 74.13] },
    { name: "AAPL", returns: [88.96, 82.31, 34.65, -26.51, 86.61] },
    { name: "AMZN", returns: [23.03, 76.26, 2.38, -49.62, 97.56] },
    { name: "GOOG", returns: [29.1, 31.03, 65.17, -38.67, 60.26] },
];
function displayPortfolio() {
    const securityList = document.getElementById("securityList");
    securityList.innerHTML = "";

    portfolioData.forEach(security => {
        const listItem = document.createElement("li");
        listItem.textContent = security.name;
        securityList.appendChild(listItem);
    });
}

function calculateCorrelation() {
    const security1 = document.getElementById("security1").value.toUpperCase();
    const security2 = document.getElementById("security2").value.toUpperCase();

    const data1 = portfolioData.find(security => security.name === security1);
    const data2 = portfolioData.find(security => security.name === security2);

    if (!data1 || !data2) {
        alert("Invalid securities entered!");
        return;
    }

    const correlation = computeCorrelation(data1.returns, data2.returns);
    document.getElementById("correlationResult").textContent = correlation.toFixed(2);
}

function computeCorrelation(returns1, returns2) {
    if (returns1.length !== returns2.length) {
        throw new Error("Arrays must have the same length for correlation calculation.");
    }

    const n = returns1.length;
    const sumX = returns1.reduce((acc, val) => acc + val, 0);
    const sumY = returns2.reduce((acc, val) => acc + val, 0);
    const sumXY = returns1.reduce((acc, val, index) => acc + val * returns2[index], 0);
    const sumX2 = returns1.reduce((acc, val) => acc + val ** 2, 0);
    const sumY2 = returns2.reduce((acc, val) => acc + val ** 2, 0);

    const numerator = n * sumXY - sumX * sumY;
    const denominator = Math.sqrt((n * sumX2 - sumX ** 2) * (n * sumY2 - sumY ** 2));

    return numerator / denominator;
}
displayPortfolio();




