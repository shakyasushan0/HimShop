import Product from "../model/Product.js";

const getProducts = async (req, res) => {
  const products = await Product.find().populate("user", "fullname email -_id");
  res.send(products);
};

const addProduct = async (req, res) => { 
  const newProduct = {
    name: "Sample Name",
    price: 10,
    description: "Sample Description",
    brand: "Sample Brand",
    category: "Sample Category",
    user: req.user._id,
  };
  const product = await Product.create(newProduct);
  res.send({ message: "Product added successfully!" });
};

// /api/products/:id
const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ error: "Product not found!" });
  }
};
// /api/product/:id -> PUT
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, category, brand, image, description } = req.body;
  const product = await Product.findById(id);
  if (!product) return res.status(404).send({ error: "Product not found" });
  product.name = name || product.name;
  product.price = price || product.price;
  product.category = category || product.category;
  product.brand = brand || product.brand;
  product.image = image || product.image;
  product.description = description || product.description;
  await product.save();
  res.send({ message: "Product updated!" });
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);
  if (product) res.send({ message: "Product deleted!" });
  else res.status(404).send({ error: "Product not found" });
};

export {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
