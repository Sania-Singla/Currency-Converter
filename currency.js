const dropdowns = document.getElementsByClassName("dropdown"); //will return an array
const submitBtn = document.getElementById("get-exchange-rate");
const input = document.getElementById("input");
const msg = document.getElementById("msg");
const fromImage = document.getElementById("fromimage");
const toImage = document.getElementById("toimage");
const fromDropdown = document.getElementById("from-dropdown");
const toDropdown = document.getElementById("to-dropdown");

addEventListener("load", function () {
    input.value = 1;
    updateExchangeRate();
});

for (let j = 0; j < dropdowns.length; j++) {
    for (i in countryList) { // for-in loop is used for objects and returns the keys in 'i' remember that i will be a string
        const newOption = document.createElement("option");
        newOption.innerText = i;
        newOption.setAttribute("value", i);
        dropdowns[j].append(newOption);
        if (i === "USD" && j === 0) {
            //to set the intial states on refresh
            newOption.selected = true; 
        } else if (i === "INR" && j === 1) {
            newOption.selected = true;
        }
    }
    dropdowns[j].addEventListener("change", function (e) {
        updateFlag(e.target);
    });

}

function updateFlag(target) {
    let currencyCode = target.value;
    let countryCode = countryList[currencyCode];
    let image = target.parentElement.querySelector("img");
    image.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
}

submitBtn.addEventListener("click", async function (e) {
    e.preventDefault();
    updateExchangeRate();
});

async function updateExchangeRate() {
    let fromCurrencyCode = fromDropdown.value;
    let toCurrencyCode = toDropdown.value;

    let URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurrencyCode.toLowerCase()}.json`;
    let response = await fetch(URL);
    let redable = await response.json();
    let baseCurrencyCode = redable[fromCurrencyCode.toLowerCase()];
    let exchangeRate = baseCurrencyCode[toCurrencyCode.toLowerCase()];
    
    if (input.value < 0 || !input.value) {
        alert("please enter a valid amount!");
        input.value = 1; 
    }
    msg.innerText = `${input.value} ${fromCurrencyCode} = ${
        exchangeRate * input.value
    } ${toCurrencyCode}`;
}
