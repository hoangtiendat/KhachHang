const mongoose = require('mongoose');
//const AutoIncrement = require('mongoose-sequence')(mongoose);

const productSchema = new mongoose.Schema({
  id: String,
  new: Boolean,
  name: String,
  urlImage: String,
  discount: String,
  price: String,
  category: String
});

productSchema.index({coords: '2dsphere'});
//productSchema.plugin(AutoIncrement, {inc_field: 'id'});
mongoose.model('Product', productSchema);
