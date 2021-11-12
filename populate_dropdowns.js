const RAPIDAPI_API_URL = 'https://arjunkomath-jaas-json-as-a-service-v1.p.rapidapi.com/';

function httpGet(theUrl)
{
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send();
    return JSON.parse(xmlHttp.response);
}

function populateCountries() {
    let countries = httpGet("https://xc-countries-api.herokuapp.com/api/countries/");
    var sel = document.getElementById('countries');
    for(var i = 0; i < countries.length; i++) {
        var opt = document.createElement('option');
        opt.innerHTML = countries[i]["name"];
        opt.value = countries[i]["name"];
        sel.appendChild(opt);
    }
}

function populateStates() {
    let countries = httpGet("https://xc-countries-api.herokuapp.com/api/countries/");
    var country = document.getElementById('countries');
    var name = country.options[country.selectedIndex].value;
    var code;
    for (var i = 0; i < countries.length; i++) {
        if (countries[i]["name"] === name) {
            code = countries[i]["code"];
            break;
        }
    }
    let states = httpGet("https://xc-countries-api.herokuapp.com/api/countries/" + code + "/states/");
    var sel = document.getElementById('states');
    for(var i = 0; i < states.length; i++) {
        var opt = document.createElement('option');
        opt.innerHTML = states[i]["name"];
        opt.value = states[i]["name"];
        sel.appendChild(opt);
    }
}
