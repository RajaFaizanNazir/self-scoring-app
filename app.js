/********************************************************************************* */
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const serverless = require("serverless-http");
require("dotenv").config();
/********************************************************************************* */
const HttpError = require(`./util/http-error`);
/********************************************************************************* */
const app = express();
app.use(bodyParser.json({ limit: "50mb" }));
/********************************************************************************* */
app.use(cors());
/********************************************************************************* */
/**************** Routes **************** */
/********************************************************************************* */
app.use("/api/email", require(`./routes/email-routes`));
/********************************************************************************* */

/********************************************************************************* */
app.use((req, res, next) => {
  console.log("Could not find this route");
  return res.status(404).json({
    message: `Invalid Link, Could not find this route! \'${req.url}\'`,
  });
});
/********************************************************************************* */
app.listen(process.env.PORT || 5000, () => {
  console.log("Server is up port " + (process.env.PORT || 5000));
});
/********************************************************************************* */
const handler = serverless(app);
/********************************************************************************* */
module.exports.handler = async (event, context, callback) => {
  try {
    context.callbackWaitsForEmptyEventLoop = false;
    const result = await handler(event, context);
    callback(null, result);
  } catch (err) {
    Logger.info(err.message);
    callback(null, err.message);
  }
};
