//<editor-fold desc="Old">
// "use strict";
//
// // VARIABLES -----------------------
// var riskChart = document.getElementById('riskChart').getContext('2d');
//
// const colors = [
// 'rgba(255, 102, 255)',
// 'rgba(255, 0, 0)',
// 'rgba(255, 169, 0)',
// 'rgba(255, 255, 0)',
// 'rgba(144, 238, 144)'
// ];
//
// const backgrounds = [
//   'rgba(255, 102, 255, 0.5)',
//   'rgba(255, 0, 0, 0.5)',
//   'rgba(255, 169, 0, 0.5)',
//   'rgba(255, 255, 0, 0.5)',
//   'rgba(144, 238, 144, 0.5)'
// ];
//
// const threats = ["Skills required", "Motive", "Opportunity", "Population Size",
// "Easy of Discovery", "Ease of Exploit", "Awareness", "Intrusion Detection",
// "Loss of confidentiality", "Loss of Integrity", "Loss of Availability", "Loss of Accountability",
// "Financial damage", "Reputation damage", "Non-Compliance", "Privacy violation"
// ];
//
// const partials = ["sl", "m", "o", "s", "ed", "ee", "a", "id", "lc", "li", "lav", "lac", "fd", "rd", "nc", "pv"];
//
// const riskChartOptions = {
//   legend: {
//     position: 'top',
//     display: false,
//   },
//   title: {
//     display: false,
//     text: 'Chart.js Radar Chart'
//   },
//   scale: {
//     ticks: {
//       beginAtZero: true,
//       suggestedMin: 0,
//       suggestedMax: 10,
//       stepSize: 1
//     }
//   }
// };
//
// // CHARTS -----------------------
// riskChart = new Chart(riskChart, {
//   type: 'radar',
//   data: {
//     labels: [],
//     datasets: [{
//       data: [],
//       pointBackgroundColor: "",
//       backgroundColor: "",
//       borderColor: "",
//       borderWidth: 2
//     }]
//   },
//   options: riskChartOptions
// });
//
// updateRiskChart()
//
// if(getUrlParameter('vector')){
//   loadVectors(getUrlParameter('vector'))
// }
//
// // FUNCTIONS -----------------------
// function loadVectors(vector) {
//
//   vector = vector.replace('(', '').replace(')', '');
//   var values = vector.split('/');
//
//   if (values.length == 16) {
//     for (let i=0; i<values.length; i++) {
//         let aux = values[i].split(':');
//         let vector = aux[1];
//         console.log(vector)
//         $("#" + partials[i].toLowerCase()).val(vector);
//     }
//   } else {
//     swal("Hey!!", "The vector is not correct, make sure you have copied correctly", "error");
//   }
//
//   calculate()
// }
//
// function calculate(){
//   var LS = 0;
//   var IS = 0;
//   var dataset = [];
//   var score = '';
//   deleteClass();
//
//   // Get values THREAT AGENT FACTORS and VULNERABILITY FACTORS
//   LS = +$("#sl").val() +
//       +$("#m").val() +
//       +$("#o").val() +
//       +$("#s").val() +
//       +$("#ed").val() +
//       +$("#ee").val() +
//       +$("#a").val() +
//       +$("#id").val();
//   dataset.push($("#sl").val());
//   dataset.push($("#m").val());
//   dataset.push($("#o").val());
//   dataset.push($("#s").val());
//   dataset.push($("#ed").val());
//   dataset.push($("#ee").val());
//   dataset.push($("#a").val());
//   dataset.push($("#id").val());
//
//   // Get values TECHNICAL IMPACT FACTORS and BUSINESS IMPACT FACTORS
//   IS = + $("#lc").val() +
//   + $("#li").val() +
//   + $("#lav").val() +
//   + $("#lac").val() +
//   + $("#fd").val() +
//   + $("#rd").val() +
//   + $("#nc").val() +
//   + $("#pv").val() + 0;
//   dataset.push($("#lc").val());
//   dataset.push($("#li").val());
//   dataset.push($("#lav").val());
//   dataset.push($("#lac").val());
//   dataset.push($("#fd").val());
//   dataset.push($("#rd").val());
//   dataset.push($("#nc").val());
//   dataset.push($("#pv").val());
//  
//   var LS = (LS/8).toFixed(3);
//   var IS = (IS/8).toFixed(3);
//
//   var FLS = getRisk(LS);
//   var FIS = getRisk(IS);
//
//   $(".LS").text(LS + " " + FLS);
//   $(".IS").text(IS + " " + FIS);
//
//   score = '(';
//   score = score + 'SL:' + $("#sl").val() + '/';
//   score = score + 'M:' + $("#m").val() + '/';
//   score = score + 'O:' + $("#o").val() + '/';
//   score = score + 'S:' + $("#s").val() + '/';
//   score = score + 'ED:' + $("#ed").val() + '/';
//   score = score + 'EE:' + $("#ee").val() + '/';
//   score = score + 'A:' + $("#a").val() + '/';
//   score = score + 'ID:' + $("#id").val() + '/';
//   score = score + 'LC:' + $("#lc").val() + '/';
//   score = score + 'LI:' + $("#li").val() + '/';
//   score = score + 'LAV:' + $("#lav").val() + '/';
//   score = score + 'LAC:' + $("#lac").val() + '/';
//   score = score + 'FD:' + $("#fd").val() + '/';
//   score = score + 'RD:' + $("#rd").val() + '/';
//   score = score + 'NC:' + $("#nc").val() + '/';
//   score = score + 'PV:' + $("#pv").val();
//   score = score + ')';
//   $('#score').text(score);
//   $("#score").attr("href", "https://javierolmedo.github.io/OWASP-Calculator/?vector=" + score);
//
//   if(getRisk(LS) == "LOW"){
//       $(".LS").addClass("classNote");
//   } else if (getRisk(LS) == "MEDIUM"){
//       $(".LS").addClass("classMedium");
//   } else {
//       $(".LS").addClass("classHigh");
//   }
//
//   if(getRisk(IS) == "LOW"){
//       $(".IS").addClass("classNote");
//   } else if (getRisk(IS) == "MEDIUM"){
//       $(".IS").addClass("classMedium");
//   } else {
//       $(".IS").addClass("classHigh");
//   }
//
//   //FINAL
//   var RS = getCriticaly(FLS, FIS);
//   if(RS == "NOTE"){
//       $(".RS").text(RS);
//       $(".RS").addClass("classNote");
//   } else if (RS == "LOW"){
//       $(".RS").text(RS);
//       $(".RS").addClass("classLow");
//   } else if(RS == "MEDIUM"){
//       $(".RS").text(RS);
//       $(".RS").addClass("classMedium");
//   } else if(RS == "HIGH"){
//       $(".RS").text(RS);
//       $(".RS").addClass("classHigh");
//   } else if(RS == "CRITICAL"){
//       $(".RS").text(RS);
//       $(".RS").addClass("classCritical");
//   } else {
//       $(".RS").text(RS);
//       $(".RS").addClass("classNote");
//   }
//
//   updateRiskChart(dataset, RS)
// }
//
// function getRisk(score){
//   if(score == 0) return 'NOTE';
//   if(score < 3) return 'LOW';
//   if(score < 6) return 'MEDIUM';
//   if(score <= 9) return 'HIGH';
// }
//
// // Calculate final Risk Serverity
// function getCriticaly(L, I){
//   //NOTE
//   if(L == "LOW" && I == "LOW") return 'NOTE';
//
//   //LOW
//   if(L == "LOW" && I == "MEDIUM") return 'LOW';
//   if(L == "MEDIUM" && I == "LOW") return 'LOW';
//  
//   //MEDIUM
//   if(L == "LOW" && I == "HIGH") return 'MEDIUM';
//   if(L == "MEDIUM" && I == "MEDIUM") return 'MEDIUM';
//   if(L == "HIGH" && I == "LOW") return 'MEDIUM';
//
//   //HIGH
//   if(L == "HIGH" && I == "MEDIUM") return 'HIGH';
//   if(L == "MEDIUM" && I == "HIGH") return 'HIGH';
//
//   //CRITICAL
//   if(L == "HIGH" && I == "HIGH") return 'CRITICAL';
// }
//
// // Delete class before of calculate
// function deleteClass(){
//   // Delete Class Likelihood Score
//   $(".LS").removeClass("classNote");
//   $(".LS").removeClass("classMedium");
//   $(".LS").removeClass("classHigh");
//
//   // Delete Class Impact Score
//   $(".IS").removeClass("classNote");
//   $(".IS").removeClass("classMedium");
//   $(".IS").removeClass("classHigh");
//
//   // Delete Class Risk Severity
//   $(".RS").removeClass("classNote");
//   $(".RS").removeClass("classLow");
//   $(".RS").removeClass("classMedium");
//   $(".RS").removeClass("classHigh");
//   $(".RS").removeClass("classCritical");
// }
//
// function getUrlParameter(name) {
//   name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
//   var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
//   var results = regex.exec(location.search);
//   return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
// };
//
// function updateRiskChart(dataset, RS){
//   var c = 0;
//   var dataset = dataset;
//
//   switch (RS) {
//     case "LOW":
//       c = 3;
//       break;
//     case "MEDIUM":
//       c = 2;
//       break;
//     case "HIGH":
//       c = 1;
//       break;
//     case "CRITICAL":
//       c = 0;
//       break;
//     default:
//       c = 4;
//       break;
//   }
//
//   riskChart.data.labels = threats;
//   riskChart.data.datasets[0].data = dataset;
//   riskChart.data.datasets[0].pointBackgroundColor = colors[c];
//   riskChart.data.datasets[0].backgroundColor = backgrounds[c];
//   riskChart.data.datasets[0].borderColor = colors[c];
//
//   riskChart.update();
// }
//</editor-fold>

function updateRes() {
    let leftSum = 0;
    let rightSum = 0;
    const selectorElements = [];

    for (let i = 1; i <= 8; i++) {
        leftSum += parseInt(document.getElementById("left" + i).value);
        selectorElements.push(document.getElementById("left" + i).value);
        rightSum += parseInt(document.getElementById("right" + i).value);
        selectorElements.push(document.getElementById("right" + i).value);
    }

    const vector = "VECTOR : (SL:" + selectorElements[0] + "/M:" + selectorElements[2] + "/O:" + selectorElements[4] + "/S:" + selectorElements[6] + "/ED:" + selectorElements[8] + "/EE:" + selectorElements[10] + "/A:" + selectorElements[12] + "/ID:" + selectorElements[14] + "/LC:" + selectorElements[1] + "/LI:" + selectorElements[3] + "/LAV:" + selectorElements[5] + "/LAC:" + selectorElements[7] + "/FD:" + selectorElements[9] + "/RD:" + selectorElements[11] + "/NC:" + selectorElements[13] + "/PV:" + selectorElements[15] + ")";
    document.getElementById("vectorString").textContent = vector;

    document.getElementById("leftProgText").textContent = (leftSum / 8).toFixed(2).toString();
    document.getElementById("rightProgText").textContent = (rightSum / 8).toFixed(2).toString();
    document.getElementById("riskProgText").textContent = (Math.round(((leftSum + rightSum) / 16).toFixed(2) * 20) / 20).toString();

    const valueToColor = value => `rgb(${value * 2.83},${255 - value * 2.83 * 1.2},0)`;

    document.getElementById("leftProgCircle").style.stroke = valueToColor(leftSum);
    document.getElementById("rightProgCircle").style.stroke = valueToColor(rightSum);
    document.getElementById("riskProgCircle").style.stroke = valueToColor((leftSum + rightSum) / 2);

    setProgress(((leftSum / 8) * 10), ((rightSum / 8) * 10));
}

const progressLeft = document.getElementById("leftProgCircle")
const progressRight = document.getElementById("rightProgCircle")
const progressRisk = document.getElementById("riskProgCircle")

function setProgress(percentLeft, percentRight) {

    const max = 90;
    const percentRisk = (percentLeft + percentRight) / 2

    const percentFinalLeft = (percentLeft / max) * 100;
    const circumferenceLeft = 2 * Math.PI * 65;
    const dashOffsetLeft = circumferenceLeft - (percentFinalLeft / 100) * circumferenceLeft;
    progressLeft.style.strokeDasharray = circumferenceLeft;
    progressLeft.style.strokeDashoffset = dashOffsetLeft;

    const percentFinalRight = (percentRight / max) * 100;
    const circumferenceRight = 2 * Math.PI * 65;
    const dashOffsetRight = circumferenceRight - (percentFinalRight / 100) * circumferenceRight;
    progressRight.style.strokeDasharray = circumferenceRight;
    progressRight.style.strokeDashoffset = dashOffsetRight;

    const percentFinalRisk = (percentRisk / max) * 100;
    const circumferenceRisk = 2 * Math.PI * 65;
    const dashOffsetRisk = circumferenceRisk - (percentFinalRisk / 100) * circumferenceRisk;
    progressRisk.style.strokeDasharray = circumferenceRisk;
    progressRisk.style.strokeDashoffset = dashOffsetRisk;
}

function copyVector() {
    const vector = document.getElementById("vectorString").textContent.slice(9);
    navigator.clipboard.writeText(vector).then(r => null);

    // const dialog = document.querySelector("dialog");
    // dialog.showModal();

    document.getElementById("vectorString").blur();
    document.getElementById("vectorString").textContent = "Vector copied!"
    setTimeout(() => {
        document.getElementById("vectorString").blur();
        updateRes();
    }, 350);
}

function resetLeft() {
    for (let i = 1; i <= 8; i++) {
        document.getElementById("left" + i).selectedIndex = 0;
        updateRes();
    }
}

function resetRight() {
    for (let i = 1; i <= 8; i++) {
        document.getElementById("right" + i).selectedIndex = 0;
        updateRes();
    }
}

// setProgress((10/90*100), (10/90*100));
updateRes();
