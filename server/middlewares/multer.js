const multer = require("multer");

function uploadFile(folder, subfolder) {
  const storage = multer.diskStorage({
    destination: subfolder
      ? `./public/${folder}/${subfolder}`
      : `./public/${folder}`,
    filename: function (req, file, callback) {
      callback(null, "Id-" + Date.now() + "-" + file.originalname);
    },
  });

  const upload = multer({ storage: storage }).single("file");
  return upload;
}

module.exports = uploadFile;
