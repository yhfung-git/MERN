// FOR MONGOOSE
const Product = require("../models/Product");

exports.createProduct = async (req, res, next) => {
  try {
    const { name, price } = req.body;

    const newProduct = new Product({ name, price });
    if (!newProduct) {
      return res.status(500).json({ message: "Failed to create new product" });
    }

    const newProductSaved = await newProduct.save();
    if (!newProductSaved) {
      return res.status(500).json({ message: "Failed to save new product" });
    }

    res
      .status(201)
      .json({ message: "New product created", product: newProductSaved });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    if (!products) {
      return res.status(500).json({ message: "Failed to get products" });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// FOR MONGODB
// const { getDb } = require("../utils/database");

// exports.createProduct = async (req, res, next) => {
//   try {
//     const { name, price } = req.body;
//     const newProduct = { name, price };

//     const collection = await getDb();
//     await collection.insertOne(newProduct);

//     res.status(201).json(newProduct);
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

// exports.getProducts = async (req, res, next) => {
//   try {
//     const collection = await getDb();
//     const products = await collection.find({}).toArray();

//     res.status(200).json(products);
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };
