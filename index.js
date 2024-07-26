const BASE_URL ="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";


const dropdowns = document.querySelectorAll(".dropdown select")
const btn = document.querySelector("form button")
const fromCurr = document.querySelector(".from select")
const toCurr = document.querySelector(".to select")
const msg = document.querySelector(".msg");
const swapIcon = document.querySelector(".swap-icon"); 


for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
}


const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}


const updateRateOnClick = async () => {
    let amount = document.querySelector(".amount input")
    let amtVal = amount.value;
    if(amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }
    

    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    try {
        let response = await fetch(URL);
        let data = await response.json();

        let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
        // console.log(rate);
    
        let finalVal = (amtVal * rate).toFixed(2);
        // console.log(finalVal);
        
        msg.innerText = `${amtVal} ${fromCurr.value} = ${finalVal} ${toCurr.value}`;
    }   
        catch (error) {
        console.error("Error fetching data:", error);
        msg.innerText = "Error fetching conversion rate.";
    }
}


btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    updateRateOnClick();
});


swapIcon.addEventListener("click", () => {
    const tempValue = fromCurr.value;
    fromCurr.value = toCurr.value;
    toCurr.value = tempValue;

    updateFlag(fromCurr);
    updateFlag(toCurr);

    updateRateOnClick();
});


window.addEventListener("load", () => {
    updateRateOnClick();
})
