const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  productName: { type: String, trim: true, required: true },
  unitPrice: { type: Number, trim: true, required: true },
  unitInStock: { type: Number, trim: true, required: true },
  description: { type: String, trim: true, required: true },
  manufacturer: { type: String, trim: true, required: true },
  category: { type: String, trim: true, required: true },
  condition: { type: String, trim: true, required: true },
  imageFile: { type: String, trim: true, required: true },
  // typeImage: { type: String, trim: true }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;