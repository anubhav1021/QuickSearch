const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/auth");

const {

    getMembers

} = require("../controllers/memberController");

router.get(

    "/",

    verifyToken,

    getMembers

);

module.exports = router;