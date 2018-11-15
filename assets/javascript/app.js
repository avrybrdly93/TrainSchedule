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

//error handling
let isError = [];
let trainNameErrorText = "Please Enter a Train Name";
let destinationErrorText = "Please Enter a Destination";
let firstTrainErrorText = "Please Enter a Time";
let frequencyErrorText = "Please Enter a Frequency";

let firstTrainTimeErrorText = "Please Enter a four-digit number";
let frequencyTimeErrorText = "Please Enter a number";

let trainNameText = "Train Name";
let destinationText = "Destination";
let firstTrainText = "First Train Time (24hr Time)";
let frequencyText = "Frequency (min)"

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
    minAway = frequencyVal - (minPast % frequencyVal);
    var mmtMidnight = convertedTime.clone().startOf('day');
    var diffMinutes = convertedTime.diff(mmtMidnight, 'minutes');
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

function errorHandle(value, div, textYesError, textNoError) {
    if(!value) {
        console.log("No value");
        errorDiv = div.text(textYesError);
        errorDiv.css("color", "red");
        isError.push(true);
    }
    else {
        div.css("color", "black");
        div.text(textNoError);
        isError.push(false);
    }
}
function errorHandleTimes(value, div, textYesError, textNoError) {
    if (isNaN(value)) {
        div.css("color", "red");
        div.text(textYesError);
        isError.push(true);
    }
    if (isError[4] === false) {
        console.log(typeof value);
        if (typeof value === "number") {
            div.css("color", "black");
            div.text(textNoError);
        }
        else {
        }
    }
}
function errorChecker() {
    errorHandle(trainNameVal, $("#train-name-head"), trainNameErrorText, trainNameText);
    errorHandle(destinationVal, $("#destination-head"), destinationErrorText, destinationText);

    errorHandle(firstTrainVal, $("#first-train-head"), firstTrainErrorText, firstTrainText);
    errorHandleTimes(firstTrainVal, $("#first-train-head"), firstTrainTimeErrorText, firstTrainText);

    errorHandle(frequencyVal, $("#frequency-head"), frequencyErrorText, frequencyText);
    errorHandleTimes(frequencyVal, $("#frequency-head"), frequencyTimeErrorText, frequencyText);
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
    errorChecker();
    timeCalc();
    console.log(typeof trainNameVal, typeof destinationVal, typeof firstTrainVal, typeof frequencyVal);
    console.log(isError);
    createTable = false;
    for(let i = 0; i < isError.length - 1; i++) {
        if(isError[i] === isError[i+1] === false) {
            createTable = true;    
        }
    } 
    if (createTable === true) {
        createTableRow();
    }
    isError = [];
});
});

