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
  },
  searchProduct (keyword, perPage, page) {
      return Product.find({
        name:  { "$regex": keyword, "$options": "ig" }
        })
          .populate('store')
          .populate('category')
          .limit(perPage)
          .skip(perPage * (page - 1))
          .sort({createdDate: -1})
          .exec();
  },
  countSearchProduct (keyword) {
    return Product.count({
      name:  { "$regex": keyword, "$options": "ig" }
    }).exec();
  },
  advancedSearch(query, perPage, page){
    return Product.find(query)
        .populate('store')
        .populate('category')
        .limit(perPage)
        .skip(perPage * (page - 1))
        .sort({createdDate: -1})
        .exec();
  },
  countAdvancedSearchProduct (query) {
    return Product.count(query).exec();
  },
};
