const mongoose = require('mongoose');
const Brand = mongoose.model('Brand');


module.exports = {
  getBrands(){
    return Brand.find()
    .exec();
  },
  getCount(){
    return Brand.count().exec();
  },
  getBrandById(id){
    return Brand.findOne({"BrandId": id}).exec();
  }
};
