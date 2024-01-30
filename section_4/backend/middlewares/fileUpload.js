const multer = require("multer");

const fileUpload = multer({
  // limits at 6MB
  limits: 6 * 1024 * 1024,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/images");
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    const acceptedImageTypes = ["image/png", "image/jpg", "image/jpeg"];
    const isValid = acceptedImageTypes.includes(file.mimetype);
    const error = isValid ? null : new Error("Invalid image type");

    cb(error, isValid);
  },
});

module.exports = fileUpload;
