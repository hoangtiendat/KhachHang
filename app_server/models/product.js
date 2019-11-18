const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  _id: String,
  new: Boolean,
  name: String,
  urlImage: String,
  discount: Number,
  price: Number,
  category: String,
  source: String
});


mongoose.model('Product', productSchema);