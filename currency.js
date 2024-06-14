const dropdowns=document.getElementsByClassName("dropdown");  //will return an array
const submitBtn=document.getElementById("get-exchange-rate");
const input=document.getElementById("input");
const msg=document.getElementById("msg");
const fromImage=document.getElementById("fromimage");
const toImage=document.getElementById("toimage");
const fromDropdown=document.getElementById("from-dropdown");
const toDropdown=document.getElementById("to-dropdown");


for(let j=0;j<dropdowns.length;j++)
{
    for(i in countryList)        // for-in loop is used for objects and returns the keys in 'i'  remember that i will be a string 
    {
        const newOption=document.createElement("option");
        newOption.innerText=i;
        newOption.setAttribute("value",i);
        dropdowns[j].append(newOption);
        if(i==="USD" &&j===0)
        {                                       //to set the intial states on refresh
            newOption.selected=true;   // or can use "...." becuase a non empty string is also a truthy value 
        }
        else if(i==="INR" &&j===1)
        {
            newOption.selected=true;
        }
    }

    dropdowns[j].addEventListener("change",function(e){     
        updateFlag(e.target);
    });

    //  or  dropdowns[j].addEventListener("change",function(){
    //     updateFlag(this);
    // });
}

// dropdowns.addEventListener("change",function(e){      can't do this because dropdowns is an array
//     console.log(target);
//     updateFlag(e.target);
// });


function updateFlag(target)
{
    let currencyCode=target.value;
    let countryCode=countryList[currencyCode];
    let image=target.parentElement.querySelector("img");
    image.src=`https://flagsapi.com/${countryCode}/flat/64.png`;

    //or 
    // if(target.name==="from")
    // {
    //     fromImage.src=`https://flagsapi.com/${countryCode}/flat/64.png`;
    // }
    // else
    // {
    //     toImage.src=`https://flagsapi.com/${countryCode}/flat/64.png`;
    // }
}


submitBtn.addEventListener("click",async function(e){

    e.preventDefault();
    let fromCurrencyCode=fromDropdown.value;
    let fromCountryCode=countryList[fromCurrencyCode];
    let toCurrencyCode=toDropdown.value;
    let toCountryCode=countryList[toCurrencyCode];

    let URL=`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurrencyCode.toLowerCase()}.json`;
    let response=await fetch(URL);
    let redable=await response.json();
    // console.log(redable[fromCurrencyCode.toLowerCase()]);
    let baseCurrencyCode=redable[fromCurrencyCode.toLowerCase()];
    let exchangeRate=baseCurrencyCode[toCurrencyCode.toLowerCase()];
    // console.log(exchangeRate);
    // console.log(baseCurrencyCode[toCurrencyCode.toLowerCase()]);

    if((input.value<0) ||(typeof(input.value)=="string"))     //(input.value==="")  will be also included in the string case
    {
        alert("please enter a valid amount!");
        input.value=1;      // or "1" will also work
    }
    msg.innerText=`${input.value} ${fromCurrencyCode} = ${exchangeRate*(input.value)} ${toCurrencyCode}`;

});













