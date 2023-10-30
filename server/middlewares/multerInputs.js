const multer = require("multer");

function uploadImage() {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if (file.fieldname === "img") {
        cb(null, `./public/images/company_profile`);
      } else {
        cb(null, `./public/documents/company_documents`);
      }
    },
    filename: function (req, file, callback) {
      callback(null, "Id-" + Date.now() + "-" + file.originalname);
    },
  });
  const upload = multer({ storage: storage }).fields([
    { name: "img" },
    { name: "sepa" },
  ]);
  return upload;
}

module.exports = uploadImage;
