const express = require("express")
const passport = require("passport")
const { increment, decrement } = require("../controllers/protectedController")

const router = express.Router()

router.post("/inc", passport.authenticate("jwt", { session: false }), increment)
router.post("/dec", passport.authenticate("jwt", { session: false }), decrement)

module.exports = router