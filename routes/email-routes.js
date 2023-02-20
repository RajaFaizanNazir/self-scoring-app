const express = require("express");
/********************************************************************************* */
const fileController = require("../controllers/email-controller");
/********************************************************************************* */
const router = express.Router();
/********************************************************************************* */
router.post("/sendEmail", fileController.sendEmail);
/********************************************************************************* */
module.exports = router;
/********************************************************************************* */
