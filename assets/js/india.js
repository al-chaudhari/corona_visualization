if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker.register("/service-worker.js");
  });
}

let globel = {}

function colorDoc(el, color) {
  el.style.fill = color;
}

function colorData(data) {
  for (let i of Object.keys(data)) {
    if (document.getElementById(data[i].id)) {
      peoples = parseInt(data[i].confirmedcase);



      if (peoples < 10) {
        colorDoc(document.getElementById(data[i].id), "rgb(255, 199, 226)");
      } else if (peoples < 49) {
        colorDoc(document.getElementById(data[i].id), "rgb(219, 83, 149)");
      } else if (peoples < 99) {
        colorDoc(document.getElementById(data[i].id), "rgb(181, 43, 110)");
      } else if (peoples < 199) {
        colorDoc(document.getElementById(data[i].id), "rgb(145, 7, 74)");
      } else if (peoples < 999) {
        colorDoc(document.getElementById(data[i].id), "rgb(59, 1, 29)");
      } else {
      }
    }
  }

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

function tableData(data) {
  for (let i of Object.keys(data)) {
    let el = document.createElement("tr");

    appendTd(i, el, false);

    appendTd(data[i].confirmedcase, el, 25);
    appendTd(data[i].newcase, el, 1);


    let cond = (data[i].cured / data[i].confirmedcase) * 100 > 30;
    appendTdOk(data[i].cured, el, cond);
    appendTd(data[i].death, el, 5);

    appendTd(data[i].newdeath, el, 5);


    appendTd(data[i].confirmedcase - data[i].death - data[i].cured, el, 25);

    let chances = ((data[i].cured / data[i].confirmedcase) * 100).toFixed(2);
    appendTdOk(isNaN(chances) ? 0 : chances, el, chances > 30);

    chances = ((data[i].death / data[i].confirmedcase) * 100).toFixed(2);
    appendTd(isNaN(chances) ? 0 : chances, el, 0.5);

    document.getElementById("table-body").appendChild(el);
  }
}

function showWorld(data) {
  document.getElementById("world_total").innerText = data.confirmedcase;
  document.getElementById("new_case").innerText = data.newcase;
  document.getElementById("world_death").innerText = data.death;
  document.getElementById("new_death").innerText = data.newdeath;
  document.getElementById("world_recovered").innerText = data.cured;
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
  // let new_cases = document.getElementById("new_case");
  let total_death = document.getElementById("total_death");
  // let new_death = document.getElementById("new_death");
  let chances_of_death = document.getElementById("chances_of_death");
  total_cases.innerText = data.confirmedcase;
  // new_cases.innerText = data.newcase;
  total_death.innerText = data.death;
  // new_death.innerText = data.newdeath;

  let chances = ((data.death / data.confirmedcase) * 100).toFixed(2);
  chances_of_death.innerText = chances + "%";

  // dataMark(5, data.newcase, new_cases);
  dataMark(10, data.death, total_death);
  dataMark(0.5, chances, chances_of_death);
}


window.onload = () => {
  fetch("assets/data/new.json").then(doc => {
    _ = doc.json().then(doc => {
      document.getElementById("wait").style.display = "none";
      let data = doc;
      globel.original = data;
      globel.data = oneTimeIns(data.state);
      showWorld(data.india)
      colorData(data.state);
      tableData(data.state);
    });
  });
}

let el = document.getElementById('world');

el.onmousemove = ev => {
  el = globel.data[ev.toElement.id];
  if (!el) {
    return;
  }
  if (!globel.data) {
    alert("data not available");
    return;
  }
  if (globel.data && el) {
    showData(el.state, el, ev);
  }
}

function filterSearch(data) {
  let dta = globel.original.state;
  _storage = {};
  data.forEach(el => {
    _storage[el + ""] = dta[el + ""];
  });
  return _storage;
}

let searchbar = document.getElementById("searchbar");
searchbar.onkeyup = function(ev) {
  let val = ev.target.value.toLowerCase();
  let dts = Object.keys(globel.original.state).filter(vals =>
    vals.toLowerCase().includes(val)
  );
  document.getElementById("table-body").innerHTML = "";
  tableData((filterSearch(dts)));
};


function oneTimeIns(data)
{
  let _storage = {};
    for(let i of Object.keys(data))
    {
      let dt = data[i];
      dt.state = i;
      _storage[data[i].id] = dt;
    }
    return _storage;
}


function itshidden() {
  document.getElementById("dta").style.visibility = "hidden";
}
searchbar.onfocus = itshidden;
searchbar.onmouseleave = itshidden;

document.querySelector("div.header").onmouseenter = itshidden;
document.querySelector("div.header").onclick = itshidden;
