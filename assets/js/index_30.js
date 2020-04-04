if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker.register("/service-worker.js");
  });
}
let el = document.getElementById("world");
let globel = {};

let data = {
  Afghanistan: "AF",
  Angola: "AO",
  Albania: "AL",
  "United Arab Emirates": "AE",
  Argentina: "AR",
  Armenia: "AM",
  Australia: "AU",
  Austria: "AT",
  Azerbaijan: "AZ",
  Belgium: "BE",
  Benin: "BJ",
  "Burkina Faso": "BF",
  Bangladesh: "BD",
  Bulgaria: "BG",
  "Bosnia and Herzegovina": "BA",
  Belarus: "BY",
  Belize: "BZ",
  Bolivia: "BO",
  Brazil: "BR",
  Brunei: "BN",
  Bhutan: "BT",
  "Central African Republic": "CF",
  Canada: "CA",
  Switzerland: "CH",
  Chile: "CL",
  China: "CN",
  "Côte d'Ivoire": "CI",
  Cameroon: "CM",
  "Democratic Republic of the Congo": "CD",
  "Republic of the Congo": "CG",
  Colombia: "CO",
  "Costa Rica": "CR",
  Cuba: "CU",
  Czechia: "CZ",
  Germany: "DE",
  Djibouti: "DJ",
  Denmark: "DK",
  "Dominican Republic": "DO",
  Algeria: "DZ",
  Ecuador: "EC",
  Egypt: "EG",
  Eritrea: "ER",
  Estonia: "EE",
  Ethiopia: "ET",
  Finland: "FI",
  Fiji: "FJ",
  Gabon: "GA",
  "United Kingdom": "GB",
  Georgia: "GE",
  Ghana: "GH",
  Guinea: "GN",
  "The Gambia": "GM",
  "Papua New Guinea": "GW",
  "Equatorial Guinea": "GQ",
  Greece: "GR",
  Greenland: "GL",
  Guatemala: "GT",
  Guyana: "GY",
  Honduras: "HN",
  Croatia: "HR",
  Haiti: "HT",
  Hungary: "HU",
  Indonesia: "ID",
  India: "IN",
  Ireland: "IE",
  Iran: "IR",
  Iraq: "IQ",
  Iceland: "IS",
  Israel: "IL",
  Italy: "IT",
  Jamaica: "JM",
  Jordan: "JO",
  Japan: "JP",
  Kazakhstan: "KZ",
  Kenya: "KE",
  Kyrgyzstan: "KG",
  Cambodia: "KH",
  "South Korea": "KR",
  Kuwait: "KW",
  Laos: "LA",
  Lebanon: "LB",
  Liberia: "LR",
  Libya: "LY",
  "Sri Lanka": "LK",
  Lithuania: "LT",
  Luxembourg: "LU",
  Latvia: "LV",
  Morocco: "MA",
  Moldova: "MD",
  Madagascar: "MG",
  Mexico: "MX",
  "North Macedonia": "MK",
  Mali: "ML",
  "Myanmar (Burma)": "MM",
  Montenegro: "ME",
  Mongolia: "MN",
  Mozambique: "MZ",
  Mauritania: "MR",
  Malaysia: "MY",
  Namibia: "NA",
  Niger: "NE",
  Nigeria: "NG",
  Nicaragua: "NI",
  Netherlands: "NL",
  Norway: "NO",
  Nepal: "NP",
  "New Zealand": "NZ",
  Oman: "OM",
  Pakistan: "PK",
  Panama: "PA",
  Peru: "PE",
  Philippines: "PH",
  "Papua New Guinea": "PG",
  Poland: "PL",
  Portugal: "PT",
  Paraguay: "PY",
  Qatar: "QA",
  Romania: "RO",
  Russia: "RU",
  Rwanda: "RW",
  "Saudi Arabia": "SA",
  Sudan: "SD",
  Senegal: "SN",
  "El Salvador": "SV",
  Serbia: "RS",
  Suriname: "SR",
  Slovakia: "SK",
  Slovenia: "SI",
  Sweden: "SE",
  Syria: "SY",
  Chad: "TD",
  Togo: "TG",
  Thailand: "TH",
  "Timor-Leste": "TL",
  Tunisia: "TN",
  Turkey: "TR",
  Tanzania: "TZ",
  Uganda: "UG",
  Ukraine: "UA",
  Uruguay: "UY",
  "United States": "US",
  Uzbekistan: "UZ",
  Venezuela: "VE",
  Vietnam: "VN",
  "South Africa": "ZA",
  Zambia: "ZM",
  Zimbabwe: "ZW",
  Somalia: "SO",
  "French Guiana": "GF",
  France: "FR",
  Spain: "ES",
  Aruba: "AW",
  Anguilla: "AI",
  Andorra: "AD",
  "Antigua and Barbuda": "AG",
  "The Bahamas": "BS",
  Bermuda: "BM",
  Barbados: "BB",
  "Cayman Islands": "KY",
  Dominica: "DM",
  Grenada: "GD",
  "Saint Kitts and Nevis": "KN",
  "Saint Lucia": "LC",
  Liechtenstein: "LI",
  Maldives: "MV",
  Malta: "MT",
  Montserrat: "MS",
  Mauritius: "MU",
  "New Caledonia": "NC",
  "Puerto Rico": "PR",
  "French Polynesia": "PF",
  Singapore: "SG",
  "Sint Maarten": "SX",
  Seychelles: "SC",
  "Turks and Caicos Islands": "TC",
  "Trinidad and Tobago": "TT",
  "Saint Vincent and the Grenadines": "VC",
  "British Virgin Islands": "VG",
  // "Virgin Islands": "VI",
  Cyprus: "CY",
  Turkmenistan: "TM",
  // Tajikistan: "TJ",
  // Reunion: "RE",
  Mayotte: "YT",
  Martinique: "MQ",
  Guadeloupe: "GP",
  Curaçao: "CW"
};

function worldShow(data) {
  document.getElementById("world_total").innerText = data.confirmedcase;
  document.getElementById("world_death").innerText = data.death;
  document.getElementById("world_recovered").innerText = data.recovered;
}

function colorDoc(id, color) {
  document.getElementById(id).style.fill = color;
}

function colorData(dta) {
  for (let i of Object.keys(data)) {

    if (dta[i]) {
      peoples = parseInt(dta[i].confirmedcase);
      if (!dta[i]) {
        continue;
      }
      if (peoples < 10) {
        colorDoc(data[i], "rgb(255, 199, 226)");
      } else if (peoples < 99) {
        colorDoc(data[i], "rgb(219, 83, 149)");
      } else if (peoples < 999) {
        colorDoc(data[i], "rgb(181, 43, 110)");
      } else if (peoples < 9999) {
        colorDoc(data[i], "rgb(145, 7, 74)");
      } else if (peoples > 10000) {
        colorDoc(data[i], "rgb(59, 1, 29)");
      } else {
      }
    }
  }
}

function giveNamefrom(id) {
  for (let i of Object.keys(data)) {
    if (data[i] == id) {
      return i;
    }
  }
  return false;
}

function findSpace(ev) {
  let x, y;
  if (window.innerHeight - ev.clientY > ev.clientY) {
    y = ev.clientY + 10;
  } else {
    y = ev.clientY - 200;
  }

  if (window.innerWidth - ev.clientX > ev.clientX) {
    x = ev.clientX + 20;
  } else {
    x = ev.clientX - 160;
  }

  return [x, y];
}

function dataMark(mark, data, el) {
  if (data > mark) {
    el.classList = ["red"];
  } else {
    el.classList = [];
  }
}

function dataOk(cond, el) {
  if (cond) {
    el.classList = ["green"];
  } else {
    el.classList = [];
  }
}

function appendTd(data, elm, mark, cond = false) {
  let el = document.createElement("td");
  el.innerText = data;
  if (mark) {
    dataMark(mark, data, el);
  }
  if (cond) {
    dataOk(cond, el);
  }
  elm.appendChild(el);
}

function appendTdOk(data, elm, cond) {
  let el = document.createElement("td");
  el.innerText = data;
  if (cond) {
    dataOk(cond, el);
  }
  elm.appendChild(el);
}

function tableData(dta) {
  for (let i of Object.keys(dta)) {
    let el = document.createElement("tr");

    appendTd(i, el, false);

    appendTd(dta[i].confirmedcase, el, 999, dta[i].confirmedcase < 100);

    appendTd(dta[i].newcase, el, 10);

    let cond = (dta[i].recovered / dta[i].confirmedcase) * 100 > 30;
    appendTdOk(dta[i].recovered, el, cond);

    appendTd(dta[i].death, el, 10);

    appendTd(dta[i].newdeath, el, 3);

    appendTd(dta[i].confirmedcase - dta[i].death - dta[i].recovered, el, false);

    let chances = ((dta[i].recovered / dta[i].confirmedcase) * 100).toFixed(2);
    appendTdOk(isNaN(chances) ? 0 : chances, el, chances > 30);

    chances = ((dta[i].death / dta[i].confirmedcase) * 100).toFixed(2);
    appendTd(isNaN(chances) ? 0 : chances, el, 0.5);

    document.getElementById("table-body").appendChild(el);
  }
}

function showData(ctry, data, ev) {
  if (!ev) {
    return;
  }
  let sp = findSpace(ev);

  let cnt = document.getElementById("dta");
  cnt.style.visibility = "visible";
  cnt.style.top = sp[1] + "px";
  cnt.style.left = sp[0] + "px";
  let cont = document.getElementById("country");
  cont.innerText = ctry;
  let total_cases = document.getElementById("total_case");
  let new_cases = document.getElementById("new_case");
  let total_death = document.getElementById("total_death");
  let new_death = document.getElementById("new_death");
  let chances_of_death = document.getElementById("chances_of_death");
  total_cases.innerText = data.confirmedcase;
  new_cases.innerText = data.newcase;
  total_death.innerText = data.death;
  new_death.innerText = data.newdeath;

  let chances = ((data.death / data.confirmedcase) * 100).toFixed(2);
  chances_of_death.innerText = chances + "%";

  dataMark(5, data.newcase, new_cases);
  dataMark(10, data.death, total_death);
  dataMark(0.5, chances, chances_of_death);
}

window.onload = function() {
  fetch("assets/data/result_world.json").then(doc =>
    doc.json().then(doc => worldShow(doc))
  );
  fetch("assets/data/result.json").then(doc => {
    _ = doc.json().then(doc => {
      document.getElementById("wait").style.display = "none";
      let data = doc;
      globel.data = data;
      colorData(globel.data);
      tableData(globel.data);
    });
  });
};

el.onmousemove = ev => {
  el = giveNamefrom(ev.toElement.id);
  if (!el) {
    return;
  }
  if (!globel.data) {
    alert("data not available");
    return;
  }
  if (globel.data && el) {
    showData(el, globel.data[el], ev);
  }
};

function filterSearch(data) {
  let dta = globel.data;
  _storage = {};
  data.forEach(el => {
    _storage[el + ""] = dta[el + ""];
  });
  return _storage;
}

let searchbar = document.getElementById("searchbar");
searchbar.onkeyup = function(ev) {
  let val = ev.target.value.toLowerCase();
  let dts = Object.keys(globel.data).filter(vals =>
    vals.toLowerCase().includes(val)
  );
  document.getElementById("table-body").innerHTML = "";
  tableData(filterSearch(dts));
};

function itshidden() {
  document.getElementById("dta").style.visibility = "hidden";
}
searchbar.onfocus = itshidden;
searchbar.onmouseleave = itshidden;

document.querySelector("div.header").onmouseenter = itshidden;
document.querySelector("div.header").onclick = itshidden;
