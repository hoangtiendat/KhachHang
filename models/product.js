const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  new: Boolean,
  name: String,
  urlImage: String,
  discount: Number,
  price: Number
});


mongoose.model('Product', productSchema);