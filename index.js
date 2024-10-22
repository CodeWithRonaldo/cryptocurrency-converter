const api_key = "e0b8d02d5658b436795829511fd7470e";
const url = "http://api.coinlayer.com/api/";
let rates = {};

async function getExchangeRate() {
  const request = await fetch(
    `https://api.coinlayer.com/api/live?access_key=e0b8d02d5658b436795829511fd7470e`,
    {
      mode: "cors",
    }
  );

  const response = await request.json();
  rates = response.rates;
  console.log(rates);

  return response;
}

const selects = document.querySelectorAll("select");

const arr = [];
getExchangeRate().then((data) => {
  for (let key in data.rates) {
    arr.push({ name: key, rate: data.rates[key] });
  }

  arr.forEach((curr) => {
    selects.forEach((select) => {
      const option = document.createElement("option");

      option.textContent = curr.name;
      option.value = curr.name.toLowerCase();

      select.appendChild(option);
    });
  });
});

const convertButton = document.querySelector(".convert-btn");

const to = document.querySelector('[name="to"]');
const from = document.querySelector('[name="from"]');
const userInput = document.querySelector(".input-amount");
const convertedAmount = document.querySelector(".converted");

convertButton.addEventListener("click", () => {
  const toCurrency = to.value.toUpperCase();
  const fromCurrency = from.value.toUpperCase();
  const amount = parseInt(userInput.value);

  console.log(fromCurrency);
  console.log(rates[fromCurrency]);

  if (fromCurrency && toCurrency && amount) {
    const fromRate = rates[fromCurrency];
    const toRate = rates[toCurrency];
    console.log(toRate);
    console.log(fromRate);

    const Amountconverted = (+amount * fromRate) / toRate;
    convertedAmount.value = Amountconverted.toFixed(6);
    console.log(Amountconverted);
  } else {
    alert("Please enter valid amounts and select currencies.");
  }
});
