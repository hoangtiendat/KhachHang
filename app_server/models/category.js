const mongoose = require('mongoose');
const Category = mongoose.model('Category');


module.exports = {
  getCategories(){
    return Category.find()
    .exec();
  },
  getCount(){
    return Category.count().exec();
  },
  getCategoryById(id){
    return Category.findOne({"CategoryId": id}).exec();
  },
  // getCategoryByCategory(category){
  //   return Category.find({"category": category}).exec();
  // },
  // getCategoryBySource(source){
  //   return Category.find({"source": source}).exec();
  // }
};
