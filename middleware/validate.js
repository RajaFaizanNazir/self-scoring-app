const { body, validationResult } = require("express-validator");
/********************************************************************************* */
const linkValidator = () => {
  return [body("fileId").exists()];
};
/********************************************************************************* */
module.exports = {
  linkValidator,
  body,
  validationResult,
};
/********************************************************************************* */
