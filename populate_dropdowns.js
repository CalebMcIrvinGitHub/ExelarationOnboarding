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
