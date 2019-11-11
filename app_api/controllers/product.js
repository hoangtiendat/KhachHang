const mongoose = require('mongoose');
const Product = mongoose.model('Product');
// console.log(Product);
// console.log(mongoose);
// const db = mongoose.connection;
// let text = [];
// db.on('connected', () => {
//   const collection = db.collection("product");
//   // perform actions on the collection object
//   collection.find({}).toArray(function(err, result) {
//     if (err) throw err;
//     text = result;
//     console.log(result);
//   });
// });
Product.deleteMany();

exports.productsList = function (req, res) {
  Product
      .find({})
      .exec((err, product) => {
        if (!product) {
          return res
            .status(404)
            .json({"message": "product not found"});
        } else if (err) {
          return res
            .status(404)
            .json(err);
        } else {
          return res
            .status(200)
            .json(product);
        }
      });
};

exports.productsCreate = (req, res) => {
  console.log(req.body.name);
  console.log(req);
  Product.create({
    new: req.body.new,
    name: req.body.name,
    urlImage: req.body.urlImage,
    discount: req.body.discount,
    price: req.body.price   
  },
  (err, product) => {
    if (err) {
      res
        .status(400)
        .json(err);
    } else {
      res
        .status(201)
        .json(product);
    }
  });
};
