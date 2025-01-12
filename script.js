const freelancers = []; //empty array to store freelancers
const freelancerList = document.getElementById("freelancers"); //gets the reference to "freelancers" from the HTML file
const averagePriceElement = document.getElementById("average"); //gets the reference to "average" from the HTML file

//Function below displays new freelancer entries 
function renderFreelancer(name, occupation, price) {
    const li = document.createElement("li");
    li.textContent = `${name}, ${occupation}, starting at $${price}`;
    freelancerList.appendChild(li); //adds the newly listed freelancer to the master freelancer listing
}

//Function that adds a new freelancer to the array and display
function addFreelancer(name, occupation, price) {
    freelancers.push({ name, occupation, price }); //adds freelancer as an object to the array
    renderFreelancer(name, occupation, price); //displays the new freelancer in the HTML (see renderFreelancer function above)
    updateAveragePrice(); //recalculates and updates the average freelancer price as new freelancers are added to the array
}

//Function that calculates and displays the average price of all freelancers 
function updateAveragePrice() {
    const total = freelancers.reduce((sum, freelancer) => sum + freelancer.price, 0); //adds all freelancer prices
    const average = (total / freelancers.length).toFixed(2); //calculates average and adjusts to two decimal places
    averagePriceElement.textContent = average; //displays the average price in the HTML file
}

// add initial freelancers
addFreelancer("Alice", "Writer", 30);
addFreelancer("Bob", "Teacher", 50);

// add new freelancers at random
function addNewFreelancer() {
    setTimeout(() => {
        addFreelancer("Carol", "Programmer", 70);
    }, 3000); // adds freelancer every three seconds

//adds a new freelancer at random every five seconds
    setInterval(() => {
        const names = ["David", "Eve", "Frank"]; //array of names
        const occupations = ["Consultant", "Graphic Designer", "Architect"]; //array of occupations
        const randomName = names[Math.floor(Math.random() * names.length)]; //randomly selects a name from names array 
        const randomOccupation = occupations[Math.floor(Math.random() * occupations.length)]; //randomly selects an occupation from the occupations array
        const randomPrice = Math.floor(Math.random() * 100) + 20; //generates a random price between 20 and 119
        addFreelancer(randomName, randomOccupation, randomPrice);
    }, 5000); // adds freelancer every five seconds 
}

//starts the audomatic addition of freelancers to the existing listing
addNewFreelancer();