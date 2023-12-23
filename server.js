//DEPENDENCIES
const express = require("express")
const morgan = require("morgan") // bff w/ all the logger tea
const methodOverride = require("method-override")
const bookRouter = require("./routes/book")

const seedData = require("./models/seed")
require("dotenv").config() // how we access our .env variables
require("./config/db") //bring in our db config to run after database is configured

const app = express()
const {PORT = 3013} = process.env


// other way of writing above: const PORT = proces.env.PORT || 3013

const Book = require("./models/Book.js")

//MIDDLEWARE
app.use((req, res, next) => {
    req.model = {
        Book,
        seedData
    }
    console.log("this is middleware")
    // go to the next app method
    next()
})
app.use(morgan("dev"))
app.use(express.urlencoded({extended: true})) //how we access req.body!!!
app.use(methodOverride("_method")) //lets us use DELETE PUT HTTP verbs




//ROUTES & ROUTER
//app.use(prefix url, router to execute)
app.use("/books", bookRouter)


//SERVER LISTENER
app.listen(PORT, () => {
    console.log(`Listening to the sounds of ${PORT}`)
})


