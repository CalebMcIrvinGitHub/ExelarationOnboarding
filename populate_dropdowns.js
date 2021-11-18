/***
function httpGet(theUrl)
{
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false );
    xmlHttp.send();
    return JSON.parse(xmlHttp.response);
}

function httpPost(theUrl, toPost)
{
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", theUrl, true );
    xmlHttp.setRequestHeader('Content-type',  'application/json');
    xmlHttp.send(toPost);
}
*/
async function httpGet(theUrl) {
    let gotten = await fetch(theUrl);
    let theText = await gotten.text();
    return JSON.parse(theText);
}

async function httpPost(theUrl, toPost) {
    const response = await fetch(theUrl, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: toPost
      });
}

async function populateCountries() {
    let countries = await httpGet("https://xc-countries-api.herokuapp.com/api/countries/");
    countries.sort(compare)
    var sel = document.getElementById('countries');
    var oth = document.getElementById('countryAddTo');
    for(var i = 0; i < countries.length; i++) {
        var opt = document.createElement('option');
        opt.innerHTML = countries[i]["name"];
        opt.value = countries[i]["code"];
        sel.appendChild(opt);

        var othopt = document.createElement('option');
        othopt.innerHTML = countries[i]["name"];
        othopt.value = countries[i]["id"];
        oth.appendChild(othopt);
    }
}

async function populateStates() {
    let code = document.getElementById('countries').value;
    var sel = document.getElementById('states');
    if (!code){
        sel.options.length = 0;
        return;
    }
    let states = await httpGet("https://xc-countries-api.herokuapp.com/api/countries/" + code + "/states/");
    states.sort(compare)
    sel.options.length = 0;
    for(var i = 0; i < states.length; i++) {
        var opt = document.createElement('option');
        opt.innerHTML = states[i]["name"];
        sel.appendChild(opt);
    }
}

function compare(a, b) {
    a = a["name"];
    b = b["name"];
    return (a < b) ? -1 : (a > b) ? 1 : 0;
}
  
  

function addCountry(countryName, countryCode) {
    var toPost = JSON.stringify({ name: countryName, code: countryCode });
    httpPost("https://xc-countries-api.herokuapp.com/api/countries/", toPost);
}

async function addState() {

    let stateName = document.getElementById('stateName').value;
    let stateCode = document.getElementById('stateCode').value;
    let countryName = document.getElementById('countryAddTo').value;
    var toPost = JSON.stringify({ name: stateName, code: stateCode, countryID: countryName });
    httpPost("https://xc-countries-api.herokuapp.com/api/states/", toPost);
}