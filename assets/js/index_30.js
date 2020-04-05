if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker.register("/service-worker.js");
  });
}
let el = document.getElementById("world");
let globel = {};

function worldShow(data) {
  document.getElementById("world_total").innerText = data.confirmedcase;
  document.getElementById("world_death").innerText = data.death;
  document.getElementById("world_recovered").innerText = data.recovered;
}

function colorData(dta) {
  for (let i of Object.keys(dta)) {
    if (dta[i]) {
      peoples = parseInt(dta[i].confirmedcase);
      if (!dta[i]) {
        continue;
      }
      cdoc(peoples, i);
    }
  }
}

function cdoc(val, id) {
  for (let i of globel.data.profiles) {
    if (val < i.value) {
      document.getElementById(id).style.fill = i.color;
      return;
    }
  }
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
    appendTd(globel.data.detached[i].country, el, false);
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

el.onmousemove = ev => {
  el = ev.toElement.id;
  let data = globel.data.detached;
  if (!data[el]) {
    return;
  }
  if (globel.data && el) {
    showData(data[el].country, data[el], ev);
  }
};
let searchbar = document.getElementById("searchbar");
document.querySelector("div.table-data").onmouseenter = itshidden;
searchbar.onkeyup = function(ev) {
  let val = ev.target.value.toLowerCase();
  itshidden();
  let k = document.getElementById("table-body");
  for (let el of k.children) {
    if (!el.children[0].innerText.toLowerCase().includes(val)) {
      el.classList = ["no-display"];
    } else {
      el.classList = ["ok-display"];
    }
  }
};

function itshidden() {
  document.getElementById("dta").style.visibility = "hidden";
}
searchbar.onfocus = itshidden;
searchbar.onmouseleave = itshidden;
document.querySelector("div.header").onmouseenter = itshidden;
document.querySelector("div.header").onclick = itshidden;
