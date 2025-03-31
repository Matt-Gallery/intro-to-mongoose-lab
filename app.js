import "dotenv/config";
import mongoose from "mongoose";
import promptSync from "prompt-sync";

// const username = prompt('What is your name? ');
const prompt = promptSync();

// console.log(`Your name is ${username}`);

function displayMenu() {
  console.log("Welcome to the CRM!");
  console.log("What would you like to do?");
  console.log("1. Option 1 - Create");
  console.log("2. Option 2 - View");
  console.log("3. Option 3 - Update");
  console.log("4. Option 4 - Delete");
  console.log("5. Option 5 - Quit");
}

function handleChoice(choice) {
  switch (choice) {
    case "1":
      console.log("You chose Option 1");
      // Handle option 1 logic
      break;
    case "2":
      console.log("You chose Option 2");
      // Handle option 2 logic
      break;
    case "3":
      console.log("You chose Option 3");
      // Handle option 3 logic
      break;
    case "4":
      console.log("You chose Option 4");
      // Handle option 4 logic
      break;
    case "5":
      console.log("You chose Option 5");
      // Handle option 5 logic
      break;
    default:
      console.log("Invalid choice. Please select a number between 1 and 5.");
  }
}

let continueLoop = true;
while (continueLoop) {
  displayMenu();
  const choice = prompt("Enter your choice (1-5): ");

  if (choice === null) {
    continueLoop = false;
    console.log("Exiting the program.");
  } else {
    handleChoice(choice);
  }
}
r;

const connect = async () => {
  // Connect to MongoDB using the MONGODB_URI specified in our .env file.
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB");

  // Call the runQueries function, which will eventually hold functions to work
  // with data in our db.
  await runQueries();

  // Disconnect our app from MongoDB after our queries run.
  await mongoose.disconnect();
  console.log("Disconnected from MongoDB");

  // Close our app, bringing us back to the command line.
  process.exit();
};

connect();
