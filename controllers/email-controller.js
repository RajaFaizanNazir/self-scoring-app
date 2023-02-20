const HttpError = require("../util/http-error");
const pdf_template = require("../configration/pdf-template");

// const accessToken = process.env.dropBoxAccessToken;
/********************************************************************************* */
const sendEmail = async (req, res, next) => {
  try {
    const _to = req.body.to;
    const _subject = req.body.subject;
    const _text = req.body.text;
    const _html = req.body.html;
    const _grade = req.body.grades;
    const _fileName = req.body.fileName;
    const _bufferContent = req.body.bufferContent;

    const uid = Math.random().toString(16).substring(2);

    await pdf_template.generatePDF(
      await pdf_template.pdf_template_html(_grade),
      _to + `/${uid}_` + _fileName,
      _to,
      _subject,
      _fileName
    );
    return res.send({
      message: "Sent",
      fileURL: `https://pdf-records.s3.ap-southeast-2.amazonaws.com/${
        _to + `/${uid}_` + _fileName
      }`,
    });
  } catch (err) {
    return next(new HttpError(err, 400));
  }
};

/********************************************************************************* */
module.exports = {
  sendEmail,
};
/********************************************************************************* */
