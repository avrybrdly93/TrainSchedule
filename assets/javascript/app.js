$(document).ready(function() {

// Variables used for user input
let trainNameInputDiv = $("#add-train-name");
let destinationInputDiv = $("#add-destination");;
let firstTrainInputDiv = $("#add-first-train");
let frequencyInputDiv = $("#add-frequency");
let submitButton = $("#submit");

// Values extracted from user input
let trainNameVal = "";
let destinationVal = "";
let firstTrainVal = "";
let frequencyVal = "";
let nextArrival = "";
let nextArrivalMin = "";

let trainTableRow = "";

//moment.js time variables
let timeFormat = "hh:mm";
let convertedTime = "";
let minPast = "";
let minAway = "";

// function to create data in table row on button click
function createTableData(text) {
    let tableData = $("<td>");
    tableData.text(text);
    tableData.appendTo(trainTableRow);
}
// All time calculations used
function timeCalc() {
    convertedTime = moment(firstTrainVal, timeFormat);
    minPast = (-1 * convertedTime.diff(moment(), "minutes"));
    console.log(minPast);
    minAway = frequencyVal - (minPast % frequencyVal);
    console.log(minAway);
    var mmtMidnight = convertedTime.clone().startOf('day');
    var diffMinutes = convertedTime.diff(mmtMidnight, 'minutes');
    console.log(diffMinutes);
    nextArrivalMin = diffMinutes + minPast + minAway;
    nextArrivalHours = Math.floor(nextArrivalMin/60);
    nextArrivalModMin = nextArrivalMin % 60;
    if (nextArrivalModMin < 10) {
        nextArrivalModMin = "0" + nextArrivalModMin;
    }
    nextArrival = nextArrivalHours + ":" + nextArrivalModMin;
}
// used to get values
function getValues() {
    trainNameVal = trainNameInputDiv.val();
    destinationVal = destinationInputDiv.val();
    firstTrainVal = firstTrainInputDiv.val();
    frequencyVal = frequencyInputDiv.val();
}
// creates a row each time button is clicked
function createTableRow() {
    trainTableRow = $("<tr>");
    createTableData(trainNameVal);
    createTableData(destinationVal);
    createTableData(frequencyVal);
    createTableData(nextArrival);
    createTableData(minAway);
    trainTableRow.appendTo("#train-table");
}
// submit button function
submitButton.on("click",function(event) {
    event.preventDefault();
    getValues();
    timeCalc();
    createTableRow();

});
});

