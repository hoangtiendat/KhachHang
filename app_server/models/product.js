const mongoose = require('mongoose');
const Product = mongoose.model('Product');


module.exports = {
  getProduct(query, sort, perPage, page){
    return Product.find(query)
    .populate('store')
    .populate('category')
    .select({})
    .limit(perPage)
    .skip(perPage * (page - 1))
    .sort(sort)
    .exec();
  },
  getCount(query){
    return Product.count(query).exec();
  },
  getProductById(id){
    return Product.findOne({"productId": id})
        .populate('store')
        .populate('category')
        .exec();
  },
  getAllProduct(query, sort){
    return Product.find(query)
        .populate('store')
        .populate('category')
        .sort(sort)
        .exec();
  }
  // getProductByCategory(category){
  //   return Product.find({"category": category}).exec();
  // },
  // getProductBySource(source){
  //   return Product.find({"source": source}).exec();
  // }
};
