const { MongoClient } = require("mongodb");
require("dotenv").config();
const client = new MongoClient(process.env.MONGODB_URI);

let _db;

exports.mongoConnect = async () => {
  try {
    await client.connect();
    _db = client.db().collection("products");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    throw error;
  }
};

exports.getDb = () => {
  if (!_db) {
    throw new Error("Failed to connect MongoDB");
  }
  return _db;
};
