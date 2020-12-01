// Write your JavaScript code here!

/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/

window.addEventListener("load", function() {
   let form = document.getElementById("launchForm");

   document.getElementById("formSubmit").addEventListener("click", function(){
         let pilotName = document.querySelector("input[name=pilotName]");
         let coPilotName = document.querySelector("input[name=copilotName]");
         let fuelLevel = document.querySelector("input[name=fuelLevel]");
         let cargoMass = document.querySelector("input[name=cargoMass]");
         let fuelLevelNum = Number(fuelLevel.value);
         let cargoMassNum = Number(cargoMass.value);
         let pilotStatus = document.getElementById("pilotStatus");
         let copilotStatus = document.getElementById("copilotStatus");
         let fuelStatus = document.getElementById("fuelStatus");
         let cargoStatus = document.getElementById("cargoStatus");
         let launchStatus = document.getElementById("launchStatus");
         

         //validate that all fields are filled out and fuelLevel and cargoMass can be converted to numbers
         if (pilotName.input === "" || coPilotName.value === "" || fuelLevel.value === "" || cargoMass.value === "") {
            alert("Please enter valid information for each field.");
            event.preventDefault();
         } else if (isNaN(fuelLevelNum) || isNaN(cargoMassNum)){
            alert("Please enter a number.");
            event.preventDefault();
         } else { //update launchStatusCheck
            faultyItems.style.visibility = "visible";
            pilotStatus.innerHTML = `Pilot ${pilotName.value} is ready for launch`;
            copilotStatus.innerHTML = `Co-pilot ${coPilotName.value} is ready for launch`;
            if (fuelLevelNum < 10000) {
               fuelStatus.innerHTML = "Fuel level is too low for launch";
               launchStatus.innerHTML = "Shuttle not ready for launch";
               launchStatus.style.color = "red";
               if (cargoMassNum > 1000) {
                  cargoStatus.innerHTML = "Cargo mass is too high for launch"; 
               }
            } else if (cargoMassNum > 10000) {
               cargoStatus.innerHTML = "Cargo mass is too high for launch";
               launchStatus.innerHTML = "Shuttle not ready for launch";
               launchStatus.style.color = "red";
               if (fuelLevelNum < 10000) {
                  fuelStatus.innerHTML = "Fuel level is too low for launch";
               }
            } else {
               launchStatus.innerHTML = "Shuttle is ready for launch";
               launchStatus.style.color = "green";
            }
         }

         //fetch planetary data
         fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response){
            response.json().then(function(json){
                  const missionTarget = document.getElementById("missionTarget");
                  let planet = Math.floor(Math.random() * json.length)
                  missionTarget.innerHTML = `
                  <h2>Mission Destination</h2>
                  <ol>
                     <li>Name: ${json[planet].name}</li>
                     <li>Diameter: ${json[planet].diameter}</li>
                     <li>Star: ${json[planet].star}</li>
                     <li>Distance from Earth: ${json[planet].distance}</li>
                     <li>Number of Moons: ${json[planet].moons}</li>
                  </ol>
                  <img src="${json[planet].image}">
                  `;
            });  
         }); //end fetch

   }); //end click event
   
 }); //end load event

