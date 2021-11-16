const RAPIDAPI_API_URL = 'https://arjunkomath-jaas-json-as-a-service-v1.p.rapidapi.com/';

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

function populateCountries() {
    let countries = httpGet("https://xc-countries-api.herokuapp.com/api/countries/");
    countries.sort(function(a, b) { return compare(a["name"], b["name"]); })
    var sel = document.getElementById('countries');
    for(var i = 0; i < countries.length; i++) {
        var opt = document.createElement('option');
        opt.innerHTML = countries[i]["name"];
        opt.value = countries[i]["code"];
        
        sel.appendChild(opt);
    }
}

function populateStates() {
    let code = document.getElementById('countries').value;
    var sel = document.getElementById('states');
    if (!code){
        sel.options.length = 0;
        return;
    }
    let states = httpGet("https://xc-countries-api.herokuapp.com/api/countries/" + code + "/states/");
    states.sort(function(a, b) { return compare(a["name"], b["name"]); })
    sel.options.length = 0;
    for(var i = 0; i < states.length; i++) {
        var opt = document.createElement('option');
        opt.innerHTML = states[i]["name"];
        opt.value = states[i]["code"];
        sel.appendChild(opt);
    }
}

function compare(a, b) {
    a = a.toLowerCase();
    b = b.toLowerCase();
    return (a < b) ? -1 : (a > b) ? 1 : 0;
}
  
  

function addCountry(countryName, countryCode) {
    var toPost = JSON.stringify({ name: countryName, code: countryCode });
    httpPost("https://xc-countries-api.herokuapp.com/api/countries/", toPost);
}

function addState(stateName, stateCode, countryAddTo) {
    var toPost = JSON.stringify({ name: stateName, code: stateCode, countryID: countryAddTo });
    httpPost("https://xc-countries-api.herokuapp.com/api/states/", toPost);
}