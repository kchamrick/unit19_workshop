const freelancers = []; //empty array to store freelancers
const freelancerList = document.getElementById("freelancers"); //gets the reference to "freelancers" from the HTML file
const averagePriceElement = document.getElementById("average"); //gets the reference to "average" from the HTML file
const modal = document.getElementById("freelancer-modal"); //finds the reference to the modal container inserted into the HTML
const closeBtn = document.querySelector(".close"); //finds the reference to the modal close button inserted into the HTML

//Function creates detailed freelancer objects
function createFreelancerDetails(name, occupation, price) {
    return {
        name,
        occupation,
        price,
        experience: Math.floor(Math.random() * 15) + 1, //generates random years of experience between 1-15
        rating: (Math.random() * 2 + 3).toFixed(1), //generates a random rating between 3 and 5
        completedProjects: Math.floor(Math.random() * 50) + 5, //generates a random number of completed projects (5-54)
        description: `Experienced ${occupation.toLowerCase()} specializing in creative solutions and client satisfaction.`, //description copy
        availability: Math.random() > 0.5 ? "Available Now" : "Available Next Week" //randomly sets availability
    };
}
//Function to display new freelancer entries 
function renderFreelancer(freelancer) {
    const li = document.createElement("li");
    li.textContent = `${freelancer.name}, ${freelancer.occupation}, starting at $${freelancer.price}`; //text content for freelancer and corresponding rate
    li.addEventListener('click', () => showFreelancerDetails(freelancer));
    li.classList.add('freelancer-item'); //adds CSS class for styline
    freelancerList.appendChild(li); //adds the newly listed freelancer to the master freelancer listing
}

//Function adds a new freelancer to the array and display
function addFreelancer(name, occupation, price) {
    const freelancer = createFreelancerDetails (name, occupation, price); //creates freelancer object
    freelancers.push(freelancer); //adds freelancer as an object to the array
    renderFreelancer(freelancer); //displays the new freelancer in the HTML (see renderFreelancer function above)
    updateAveragePrice(); //recalculates and updates the average freelancer price as new freelancers are added to the array (see function below)
}

function showFreelancerDetails(freelancer) {
    //creates HTML for the modal content
    const detailsHTML = `
    <h2>${freelancer.name}</h2>
    <div class="freelancer-profile">
    <div class="profile-header">
    <h3>${freelancer.occupation}</h3>
    <span class="rating">⭐ ${freelancer.rating}</span>
    </div>
    <div class="profile-details">
                <p><strong>Starting Price:</strong> $${freelancer.price}/hr</p>
                <p><strong>Experience:</strong> ${freelancer.experience} years</p>
                <p><strong>Completed Projects:</strong> ${freelancer.completedProjects}</p>
                <p><strong>Availability:</strong> ${freelancer.availability}</p>
            </div>
            <div class="profile-description">
                <h4>About</h4>
                <p>${freelancer.description}</p>
            </div>
        </div>
        `; //creates the detailed view of freelancer
        document.getElementById('freelancer-details').innerHTML = detailsHTML; //inserts HTML into modal
        modal.style.display = "block"; //displays the modal
}
//close modal when user clicks "x"
closeBtn.onclick = function() {
    modal.style.display = "none"; //hides modal when "x" is clicked
}
//close modal when clicking outside of it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none"; //hides modal when user clicks outside
    }
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

// add new freelancers at random and sets interval for speed at which they are added
function addNewFreelancer() {
    setTimeout(() => {
        addFreelancer("Carol", "Programmer", 70);
    }, 3000); // adds freelancer every three seconds

//adds a new freelancer at random every five seconds
    setInterval(() => {
        const names = ["David", "Eve", "Frank", "George", "Ben", "John", "Jon", "Caroline", "Jackie", "Susan"]; //array of names
        const occupations = ["Consultant", "Graphic Designer", "Architect", "Software Engineer", "Digital Marketer", "Social Media Manager", "Data Analyst", "Comms Specialist", "Construction Manager", "Draftsman"]; //array of occupations
        const randomName = names[Math.floor(Math.random() * names.length)]; //randomly selects a name from names array 
        const randomOccupation = occupations[Math.floor(Math.random() * occupations.length)]; //randomly selects an occupation from the occupations array
        const randomPrice = Math.floor(Math.random() * 100) + 20; //generates a random price between 20 and 119
        addFreelancer(randomName, randomOccupation, randomPrice);
    }, 5000); // adds freelancer every five seconds 
}

//starts the audomatic addition of freelancers to the existing listing
addNewFreelancer();