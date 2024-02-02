const multer = require("multer");
const cloudinary = require("cloudinary").v2;

const { CLOUD_NAME, CLOUD_KEY, CLOUD_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_KEY,
  api_secret: CLOUD_SECRET,
  secure: true,
});

exports.handleUpload = multer({
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const acceptedImageTypes = ["image/png", "image/jpg", "image/jpeg"];
    const isValid = acceptedImageTypes.includes(file.mimetype);
    const error = isValid ? null : new Error("Invalid image type");

    cb(error, isValid);
  },
  storage: multer.memoryStorage(),
});

exports.uploadImage = async (image) => {
  try {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: "image" },
        (error, result) => {
          error ? reject(error) : resolve(result.secure_url);
        }
      );

      stream.end(image.buffer);
    });
  } catch (error) {
    console.error(">>> uploadImage", error);
    throw error;
  }
};

exports.extractImageId = async (image) => {
  return new Promise((resolve, reject) => {
    try {
      const parts = image.split("/");
      const fileName = parts[parts.length - 1];
      const imageId = fileName.split(".")[0];

      resolve(imageId);
    } catch (error) {
      console.error(">>> extractImageId", error);
      reject(error);
    }
  });
};
