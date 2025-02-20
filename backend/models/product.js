const mongoose = require('mongoose');

const additionalInfo = new mongoose.Schema({
  weight: String,
  brand: String,
  productCategory: String,
  certification: String,
  warranty: String
})
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  category: String,
  imageUrl: String,
  additionalInfo: additionalInfo
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
