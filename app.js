import 'dotenv/config';
import mongoose from 'mongoose';
import promptSync from 'prompt-sync';

const prompt = promptSync();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB!'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

const customersSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

const Customers = mongoose.model('customers', customersSchema);

async function createCustomer() {
  const name = prompt('Enter customer name: ');
  const age = parseInt(prompt('Enter customer age: '), 10);

  const customer = new Customers({ name, age });
  await customer.save();
  console.log('Customer created successfully:', customer);
}

async function viewCustomers() {
  const customers = await Customers.find();
  console.log('Below is a list of customers:');
  customers.forEach((cust, idx) => console.log(`${idx + 1}. ID: ${cust._id}, Name: ${cust.name}, Age: ${cust.age}`));
}

async function updateCustomer() {
  const id = prompt('Enter customer ID to update: ');
  const customer = await Customers.findById(id);

  if (!customer) {
    console.log('Customer not found.');
    return;
  }

  const name = prompt(`What is the customer's new name? (current: ${customer.name}): `);
  const age = parseInt(prompt(`What is the customer's new age? (current: ${customer.age}): `), 10);

  customer.name = name || customer.name;
  customer.age = age || customer.age;

  await customer.save();
  console.log('Customer updated successfully:', customer);
}

async function deleteCustomer() {
  const id = prompt('Enter customer ID to delete: ');
  const customer = await Customers.findByIdAndDelete(id);

  if (customer) {
    console.log('Customer deleted successfully:', customer);
  } else {
    console.log('Customer not found.');
  }
}

async function mainMenu() {
  let choice;

  do {
    console.log('\nCustomer Management System');
    console.log('1. Create a Customer');
    console.log('2. View all Customers');
    console.log('3. Update a Customer');
    console.log('4. Delete a Customer');
    console.log('5. Quit');

    choice = prompt('Enter your choice (1-5): ');

    switch (choice) {
      case '1': await createCustomer(); break;
      case '2': await viewCustomers(); break;
      case '3': await updateCustomer(); break;
      case '4': await deleteCustomer(); break;
      case '5': console.log('Exiting system.'); break;
      default: console.log('Invalid option. Please choose 1-5.');
    }
  } while (choice !== '5');

  mongoose.connection.close();
}

mainMenu();
