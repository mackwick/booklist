//DEPENDENCIES
const express = require("express")
const router = express.Router()

//bring in controller
const bookController = require("../controllers/books")

//ROUTES - INDUCESS

router.get("/", bookController.index)
router.get("/new", bookController.newForm)
router.delete("/:id", bookController.destroy)
router.put("/:id", bookController.update)
router.post("/", bookController.create)
router.get("/edit/:id", bookController.edit)
router.get("/seed", bookController.seed )
router.get("/:id", bookController.show)

//export router
module.exports = router