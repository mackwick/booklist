//DEPENDENCIES

const mongoose = require("mongoose")

//Create our schema - 

const bookSchema = new mongoose.Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
    completed: Boolean
})

// compose our model from the schema
const Book = mongoose.model("Book", bookSchema)

// "Book" is a variable that will be filled in as a string - bookSchema is the rest of the info

module.exports = Book