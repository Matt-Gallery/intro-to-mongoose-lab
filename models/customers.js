require('dotenv').config()
const mongoose = require('mongoose');
const prompt = require('prompt-sync')();

const customersSchema = new mongoose.Schema({
    name: String,
    age: Number,
  });

const Customers = mongoose.model('customers', customersSchema);

export default Customers;