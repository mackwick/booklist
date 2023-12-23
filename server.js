//DEPENDENCIES
const express = require("express")
const morgan = require("morgan") // bff w/ all the logger tea
const methodOverride = require("method-override")
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
app.use(methodOverride("_method")) //lets us use DELETE PUT HTTP verbs



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

//Delete
app.delete("/books/:id", async (req, res) => {
    try {
    //find a book and delete it
    let deletedBook = await Book.findByIdAndDelete(req.params.id)
    //redirect to the index page 
    res.redirect("/books")
    } catch (error) {
        res.status(500).send("something went wrong with deleting")
    }
})



//Update
app.put("/books/:id", async (req, res) => {
    //handle checkbox
    try {if (req.body.completed === "on") {
        req.body.completed = true
    } else {req.body.completed = false}
    //find by id and update with req.body
    //findByIdAndUpdate(id, data to update, options)
    let updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {new: true})
    //redirect to show page with the updated book
    res.redirect(`/books/${updatedBook._id}`)}
    catch (error) {
        res.send("Something went wrong in this route")
    }
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

//Edit
app.get("/books/edit/:id", async (req, res) => {
    try {
        //find the book and edit
        let foundBook = await Book.findById(req.params.id)
        res.render("edit.ejs", {
            book: foundBook
        })
    } catch (error) {
        res.send(error)
    }
})



//Show - GET to render one book
app.get("/books/:id", async (req, res) => {
    //find book by _id and render show.ejs w/ found book
    res.render("show.ejs", {
        book: foundBook = await Book.findById(req.params.id) //the request params object
    })
})


//SERVER LISTENER
app.listen(PORT, () => {
    console.log(`Listening to the sounds of ${PORT}`)
})


