//DEPENDENCIES
const express = require("express")
const router = express.Router()

//ROUTES - INDUCESS

//Index - GET to render all books
router.get("/", async (req, res) => {
    //find all the books and render them all
    let books = await req.model.Book.find({})
    //render them to index.ejs
    res.render("index.ejs", {
        books: books.reverse()
    })
})

//New - GET (form to create a new book)
router.get("/new", (req, res) => {
    //render the create form
    res.render("new.ejs")
})

//Delete
router.delete("/:id", async (req, res) => {
    try {
    //find a book and delete it
    let deletedBook = await req.model.Book.findByIdAndDelete(req.params.id)
    //redirect to the index page 
    res.redirect("/books")
    } catch (error) {
        res.status(500).send("something went wrong with deleting")
    }
})


//Update
router.put("/:id", async (req, res) => {
    //handle checkbox
    try {if (req.body.completed === "on") {
        req.body.completed = true
    } else {req.body.completed = false}
    //find by id and update with req.body
    //findByIdAndUpdate(id, data to update, options)
    let updatedBook = await req.model.Book.findByIdAndUpdate(req.params.id, req.body, {new: true})
    //redirect to show page with the updated book
    res.redirect(`/books/${updatedBook._id}`)}
    catch (error) {
        res.send("Something went wrong in this route")
    }
})


//Create - POST (new book)
router.post("/", async (req, res) => {
     try { 
        if (req.body.completed === "on") {
            req.body.completed = true
        }  else {
            req.body.completed = false
        }
        let newBook = await req.model.Book.create(req.body)
        res.redirect("/books")
        } catch (err) {
        res.send(err)
        }
})

//Edit
router.get("/edit/:id", async (req, res) => {
    try {
        //find the book and edit
        let foundBook = await req.model.Book.findById(req.params.id)
        res.render("edit.ejs", {
            book: foundBook
        })
    } catch (error) {
        res.send(error)
    }
})

//Seed - GET
router.get("/seed", async (req, res) => {
    try {
        //delete everything in the database
        await req.model.Book.deleteMany({})
        //create dat in the database
        await req.model.Book.create(req.model.seedData)
        //redirect back to index
        res.redirect("/books")
    } catch (error) {
        res.send("something went wrong with your seeds")
    }
})


//Show - GET to render one book
router.get("/:id", async (req, res) => {
    //find book by _id and render show.ejs w/ found book
    res.render("show.ejs", {
        book: foundBook = await req.model.Book.findById(req.params.id) //the request params object
    })
})

module.exports = router