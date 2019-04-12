//  # Firebase Assignment - Train Scheduler  

// 1. Create  and initialize Firebase
// 2. Create button to adding new trains to Train Database 
// 3. Create way to retive trains from train database 
// 4. Create way to calculate how many minutes away is the train 




// 1. Initialize Firebase 

var config = {
    apiKey: "AIzaSyAR0rgWmoBGvFgAxFpNCAbHdUqmP51inNA",
    authDomain: "traintracker-4cbbc.firebaseapp.com",
    databaseURL: "https://traintracker-4cbbc.firebaseio.com",
    projectId: "traintracker-4cbbc",
    storageBucket: "traintracker-4cbbc.appspot.com",
    messagingSenderId: "738896203797"
  };
  firebase.initializeApp(config);
  



var database = firebase.database();

// 2.  Button for adding Trains

$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainStart = moment($("#first-train-time-input").val().trim(), "HH:mm").format("X");
    var trainFriq = $("#friquency-input").val().trim();

    // Creates local object for holding train data
    var newTrain = {
        name: trainName,
        destination: trainDestination,
        start: trainStart,
        friquency: trainFriq

    };

    // Uploads train data to database

    database.ref().push(newTrain);

    // logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.start);
    console.log(newTrain.friquency);
    
    alert("Train added!");

    // Clears all of the text-boxes

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-time-input").val("");
    $("#friquency-input").val("");


});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry

database.ref().on("child_added", function (childSnapshot){
    console.log(childSnapshot.val());

    // Store into a variable

    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainStart = childSnapshot.val().start;
    var trainFriq = childSnapshot.val().friquency;

    // Train Info
    console.log(trainName);
    console.log(trainDestination);
    console.log(trainStart)
    console.log(trainFriq);
   
    // Employee Start Format
    var trainStartPretty = moment.unix(trainStart).format("HH:mm");
    
    // Calculate

    var minutesAway = moment().diff(moment(trainStartPretty, "X"), "minutes");
  console.log(minutesAway);


    // Create the new row
    var newRow = $("#here").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(trainFriq),
    $("<td>").text(trainStartPretty),
    $("<td>").text(minutesAway),
    
  );

  // Append the new row to the table
  $("#employee-table > tbody").append(newRow);

})