const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  new: Boolean,
  name: String,
  urlImage: String,
  discount: String,
  price: String
});

productSchema.index({coords: '2dsphere'});
mongoose.model('Product', productSchema);