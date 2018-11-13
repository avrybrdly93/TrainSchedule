$(document).ready(function() {

let trainNameInputDiv = $("#add-train-name");
let destinationInputDiv = $("#add-destination");;
let firstTrainInputDiv = $("#add-first-train");
let frequencyInputDiv = $("#add-frequency");
let submitButton = $("#submit");

let trainNameVal = "";
let destinationVal = "";
let firstTrainVal = "";
let frequencyVal = "";
let nextArrival = "";
let nextArrivalMin = "";

let trainTableRow = "";

let timeFormat = "hh:mm";
let convertedTime = "";
let minPast = "";
let minAway = "";

// function train (name, destination, firstTrain, frequency) {
//     this.name = name;
//     this.destination = destination;
//     this.firstTrain = firstTrain;
//     this.frequency = frequency;

//     // this code inside click function
//     // let ourNewTrain = new train(trainNameVal, destinationVal, firstTrainVal, frequencyVal);
//     // console.log(ourNewTrain);
// }


// let ourTime = "06:00";
// let ourTimeFormat = "hh:mm";
// let convertedTime = moment(ourTime, ourTimeFormat);

// let minPast = (-1 * convertedTime.diff(moment(), "minutes"));
// console.log(minPast);
// let minAway = frequency - (minPast % frequency);

// console.log(minAway)

function createTableData(text) {
    let tableData = $("<td>");
    tableData.text(text);
    tableData.appendTo(trainTableRow);
}
function timeCalc() {
    convertedTime = moment(firstTrainVal, timeFormat);
    minPast = (-1 * convertedTime.diff(moment(), "minutes"));
    console.log(minPast);
    minAway = frequencyVal - (minPast % frequencyVal);
    console.log(minAway);

    // Your moment;

    // Your moment at midnight
    var mmtMidnight = convertedTime.clone().startOf('day');

    // Difference in minutes
    var diffMinutes = convertedTime.diff(mmtMidnight, 'minutes');

    console.log(diffMinutes);


    nextArrivalMin = diffMinutes + minPast + minAway;
    nextArrivalHours = Math.floor(nextArrivalMin/60);
    nextArrivalModMin = nextArrivalMin % 60;
    if (nextArrivalModMin < 10) {
        nextArrivalModMin = "0" + nextArrivalModMin;
    }
    nextArrival = nextArrivalHours + ":" + nextArrivalModMin;
    // nextArrivalMinString = nextArrivalMin.toString();
    // nextArrival = moment(nextArrivalMin, "minutes");
    // nextArrival.format("hh:mm:ss");

}
function getValues() {
    trainNameVal = trainNameInputDiv.val();
    destinationVal = destinationInputDiv.val();
    firstTrainVal = firstTrainInputDiv.val();
    frequencyVal = frequencyInputDiv.val();
    timeCalc();
}

function createTableRow() {
    trainTableRow = $("<tr>");
    createTableData(trainNameVal);
    createTableData(destinationVal);
    createTableData(frequencyVal);
    createTableData(nextArrival);
    createTableData(minAway);
    trainTableRow.appendTo("#train-table");
}
submitButton.on("click",function(event) {
    event.preventDefault();
    getValues();
    createTableRow();

});
});

