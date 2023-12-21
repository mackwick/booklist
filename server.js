//DEPENDENCIES
const express = require("express")
const morgan = require("morgan") // bff w/ all the logger tea
require("dotenv").config() // how we access our .env variables
require("./config/db") //bring in our db config to run after database is configured

const app = express()
const {PORT = 3013} = process.env
// other way of writing above: const PORT = proces.env.PORT || 3013

const Book = require("./models/Book.js")

//MIDDLEWARE
app.use((req, res, next) => {
    console.log("this is middleware")
    next()
})
app.use(morgan("dev"))
app.use(express.urlencoded({extended: true})) //how we access req.body!!!



//ROUTES & ROUTER

//Index - GET to render all books
app.get("/books", async (req, res) => {
    //find all the books and render them all
    let books = await Book.find({})
    //render them to index.ejs
    res.render("index.ejs", {
        books: books.reverse()
    })
})


//New - GET (form to create a new book)
app.get("/books/new", (req, res) => {
    //render the create form
    res.render("new.ejs")
})


//Create - POST (new book)
app.post("/books", async (req, res) => {
     try { 
        if (req.body.completed === "on") {
            req.body.completed = true
        }  else {
            req.body.completed = false
        }
        let newBook = await Book.create(req.body)
        res.redirect("/books")
        } catch (err) {
        res.send(err)
        }
})


//Show - GET to render one book



//SERVER LISTENER
app.listen(PORT, () => {
    console.log(`Listening to the sounds of ${PORT}`)
})