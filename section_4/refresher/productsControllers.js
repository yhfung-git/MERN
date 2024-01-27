const { getDb } = require("./database");

exports.createProduct = async (req, res, next) => {
  try {
    const { name, price } = req.body;
    const newProduct = { name, price };

    const collection = await getDb();
    await collection.insertOne(newProduct);

    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const collection = await getDb();
    const products = await collection.find({}).toArray();

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
