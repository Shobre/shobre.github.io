function init() {
  // alert("Hello! I am an alert box!!");
}

function addRow() {
  let rader = document.getElementById("rader");
  console.log(rader.childElementCount);
  let newRow = document.createElement("ul");
  newRow.classList.add("row");

  for (let i = 0; i < 8; i++) {
    let newLi = document.createElement("li");
    let input = document.createElement("input");
    input.setAttribute("type", i < 3 ? "text" : "number");
    if (i == 3 || i == 4) {
      input.id =
        i == 3
          ? "antal" + rader.childElementCount
          : "apris" + rader.childElementCount;
      input.value = 0;
    }
    i < 5 ? newLi.appendChild(input) : (newLi.innerText = 0);
    newRow.appendChild(newLi);
  }
  rader.appendChild(newRow);
}

function nettOnChange(value) {
  vinstTidVal();
}

function timdebitOnChange(value) {
  // alert("I'm changing!");
  vinstTidVal();
}
function arbAntalOnChange() {
  arbetsDagar();
  arbkostSumma();
  vinstTidVal();
}
function varliftTimOnChange() {
  vinstTidVal();
}
function proAntalTimOnChange() {
  vinstTidVal();
}

function vinstTidVal() {
  let arbAntalTim = document.getElementById("arb-antal-tim").value;
  let timdebit = document.getElementById("timdebit").value;
  let varLiftTim = document.getElementById("varlift-tim").value;
  let proAntalTim = document.getElementById("pro-antal-tim").value;
  let summa =
    arbAntalTim * (timdebit - 300) + varLiftTim * 100 + proAntalTim * 400;
  // =(F39*(E6-300))+(G47*100)+(F45*400)
  document.getElementById("vinstTidVal").innerHTML = summa;
  document.getElementById("vinstTidVal").value = summa;
  totalprisExMoms();
  totalPrisInklMoms();
  totprisInkMomsRotVal();
  bidragRotVal();
  totPrisLaddBattVal();
  bidragLaddBattVal();
  totalVinstVal();
  vinstProcent();
}

function vinstProcent() {
  // =I8/E9*100
  let summa = Math.ceil(
    (document.getElementById("totalVinst").value /
      document.getElementById("totalPrisExMoms").value) *
      100
  );
  document.getElementById("vinstproc").value = summa;
  document.getElementById("vinstproc").innerHTML = summa + "%";
}

function vinstMtrlVal() {
  // =H36-I36
  console.log(
    document.getElementById("totalt-summa").value -
      document.getElementById("totalapris-summa").value
  );
}
function totalVinstVal() {
  let summa =
    document.getElementById("vinstTidVal").value +
    document.getElementById("vinstMtrl").value;
  document.getElementById("totalVinst").innerHTML = summa;
  document.getElementById("totalVinst").value = summa;
}
function totalprisExMoms() {
  // =H36+J39+J41+J43+J45
  let summa =
    document.getElementById("totalt-summa").value +
    document.getElementById("arbkost-summa").value +
    document.getElementById("resor-summa").value +
    document.getElementById("bil-summa").value +
    document.getElementById("pro-summa").value;
  document.getElementById("totalPrisExMoms").innerHTML = summa;
  document.getElementById("totalPrisExMoms").value = summa;
}

function totalPrisInklMoms() {
  let summa = document.getElementById("totalPrisExMoms").value * 1.25;
  document.getElementById("totalPrisInklMoms").innerHTML = summa;
  document.getElementById("totalPrisInklMoms").value = summa;
}

function totprisInkMomsRotVal() {
  // =E10-(F39*E6*1,25*0,3)-(F45*G45*1,25*0,3)
  let summa =
    document.getElementById("totalPrisInklMoms").value -
    document.getElementById("arb-antal-tim").value *
      document.getElementById("timdebit").value *
      1.25 *
      0.3 -
    document.getElementById("pro-antal-tim").value *
      document.getElementById("pro-timkostnad").value *
      1.25 *
      0.3;
  document.getElementById("totprisInkMomsRot").innerHTML = summa;
  document.getElementById("totprisInkMomsRot").value = summa;
}

function bidragRotVal() {
  let summa =
    document.getElementById("totalPrisInklMoms").value -
    document.getElementById("totprisInkMomsRot").value;
  document.getElementById("bidragRot").innerHTML = summa;
  document.getElementById("bidragRot").value = summa;
}

function totPrisLaddBattVal() {
  let summa = Math.floor(
    document.getElementById("totalPrisInklMoms").value -
      document.getElementById("totalPrisInklMoms").value * 0.97 * 0.5
  );
  document.getElementById("totPrisLaddBatt").innerHTML = summa;
  document.getElementById("totPrisLaddBatt").value = summa;
}

function bidragLaddBattVal() {
  let summa =
    document.getElementById("totalPrisInklMoms").value -
    document.getElementById("totPrisLaddBatt").value;
  document.getElementById("bidragLaddBatt").innerHTML = summa;
  document.getElementById("bidragLaddBatt").value = summa;
}

function arbkostSumma() {
  // =G39*H39*E6*I39
  let summa =
    document.getElementById("arb-tim-dag").value *
    document.getElementById("arb-dagar").value *
    document.getElementById("timdebit").value *
    document.getElementById("arb-gubbar").value;
  document.getElementById("arbkost-summa").innerHTML = summa;
  document.getElementById("arbkost-summa").value = summa;
}

function arbetsDagar() {
  // =F39/G39/I39
  document.getElementById("arb-dagar").value =
    document.getElementById("arb-antal-tim").value /
    document.getElementById("arb-tim-dag").value /
    document.getElementById("arb-gubbar").value;
}

// H36 = Totalt summa
// J39 = Arbetskostnad Summa
// J41 = Resor Summa
// J43 = Bil Summa
// J45 = Projektering Summa
// J49 =
// J51 =
// J53 =
// J55 =
// J57 =

// F39 = Antal tim
// E6 = Timdebitering arbetstid
// G47 = "Våran lift" Tim
// F45 = "Projektering" antal tim
