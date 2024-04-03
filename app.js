const BASE_URL =
  "https://api.frankfurter.app/latest?amount=";

  const dropdowns=document.querySelectorAll(".dropdown select");
  const fromCurr=document.querySelector(".from select");
  const toCurr=document.querySelector(".to select");
  const msg=document.querySelector(".msg");
  const button=document.querySelector("button");


for(let i of dropdowns){
   for(currCode in countryList){
    let newOption=document.createElement("option");
    newOption.innerText=currCode;
    if(i.name==="from" && currCode==='USD'){
        newOption.selected="selected"
    }
   else if(i.name==="to" && currCode==="INR"){
        newOption.selected="selected"
    }
    i.append(newOption);
    
  }
  i.addEventListener("change",(evt)=>{
     updateFlag(evt.target);
  });
}

//update the rate and calculate 
const updateExchangeRate = async () => {
  const amount = document.querySelector(".amount input");
  const amtVal = amount.value;
  if (amtVal < 1 || amount.value === "") {
    // Create the popup element
    const popup = document.createElement("div");
    popup.textContent = "Not valid";
    popup.classList.add("invalid-amount-popup");
    document.body.appendChild(popup);
    setTimeout(() => {
      popup.remove();
    }, 3000);
  }
  else{
      const URL=`${BASE_URL}${amtVal}&from=${fromCurr.value}&to=${toCurr.value}`;
      const response = await fetch(URL);
      const data = await response.json();
      let finalValue = data.rates[toCurr.value];
      msg.innerText=`${amtVal} ${fromCurr.value} = ${finalValue} ${toCurr.value}`;
  }
  // Rest of your code...
  
}

//update the flag
const updateFlag=(element)=>{
    let countryCode=countryList[element.value];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
};

//


//button 
button.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load",()=>{
  updateExchangeRate();
});