// const mongoose = require('mongoose');
// const Product = mongoose.model('Product');
const Product = require('../models/product');
const Category = require('../models/category');
const Brand = require('../models/brand');
const constant = require('../Utils/constant');
var Cart = require('../models/cart');

const product = async (req, res) => {
    var perPage = 6;
    var page = parseInt(req.query.p) || 1;
    var originalUrl = req.originalUrl;
    localStorage.setItem('myFirstKey', 'myFirstValue');
    if(req.query.categoryType){
        localStorage.setItem('category', req.query.categoryType || req.params.category);
    } else if (req.params.category) {
        localStorage.setItem('category', req.params.category);
    } else {
        localStorage.setItem('category', "")
    }

    if(req.query.brandType){
        localStorage.setItem('brand', req.query.brandType);
    } else if (req.params.brandId) {
        localStorage.setItem('brand', req.params.brandId);
    } else {
        localStorage.setItem('brand', "")
    }

    if(req.query.priceType){
        localStorage.setItem('price', req.query.priceType);
    } else {
        localStorage.setItem('price', "")
    }

    const localCategory = localStorage.getItem('category');
    const localBrand = localStorage.getItem('brand');
    const localPrice = localStorage.getItem('price');

    var json = '{';
    if(localCategory && localCategory !== ''){
        json += '"categoryId": ' + localCategory +'';
    }

    if (json !== '{' && localBrand && localBrand !== ''){
        json += ', ';
    }
    if(localBrand && localBrand !== ''){
        json += '"storeId": ' + localBrand +'';
    }

    var price = '';
    if(localPrice && localPrice !== ''){
        if (localPrice === '3000000') {
            price = '{ "$lte" : 3000000 }';
        } else if (localPrice === '7000000') {
            price = '{ "$gt" : 3000000, "$lte" : 7000000}';
        } else if (localPrice === '10000000') {
            price = '{ "$gt" : 7000000, "$lte" : 10000000}';
        } else {
            price = '{ "$gt" : "10000000" }';
        }
    }

    if(price !== ''){
        if (json !== '{'){
            json += ', ';
        }
        json += '"price": ' + price + '';
    }

    json += '}';
    console.log(json);
    const obj = JSON.parse(json);
    var sort = '{}';
    if (req.query.sort){
        sort = '{"' + req.query.sort + '":"asc"}';
    }

    const sortJson = JSON.parse(sort);
    const products = await Product.getProduct(obj, sortJson, perPage, page);
    products.forEach((product) => {
       product.firstImageUrl = product.urlImage.split(constant.urlImageSeperator)[0];
    });
    const count = await Product.getCount(obj);
    res.render('product', { 
        title: 'Sản phẩm',
        products: products,
        category: localCategory,
        brand: localBrand,
        price: localPrice,
        pagination: { page: page, pageCount: Math.ceil(count / perPage)},
        originalUrl: `/product?categoryType=${localCategory}&brandType=${localBrand}&localPrice=${localPrice}&sort=${req.query.sort || ""}`
    });
};

// const productCategory = async (req, res) => {
//     const products = await Product.getProductByCategory(req.query.category);
//     let title = "";
//     switch(req.query.category){
//         case "phone":
//             title = "Điện thoại"
//             break;
//         case "laptop":
//             title = "Laptop"
//             break;
//         case "tablet":
//             title = "Tablet"
//             break;
//         case "watch":
//             title = "Đồng hồ"
//             break;
//         default:
//     }
//     res.render('product', { title: title, products: products, user: (req.isAuthenticated) ? req.user : null });
// };

// const productstore = async (req, res) => {
//     const products = await Product.getProductBystore(req.query.store);
//     let title = "";
//     switch(req.query.store){
//         case "apple":
//             title = "Sản phẩm của Apple";
//             break;
//         case "samsung":
//             title = "Sản phẩm của Samsung";
//             break;
//         case "other":
//             title = "Sản phẩm của hãng khác";
//             break;
//         default:
//     }
//     res.render('product', { title: title, products: products, user: (req.isAuthenticated) ? req.user : null });
// };

const productDetail = async (req, res) => {
    const product = await Product.getProductById(req.params.productId);
    if (product){
        product.salePrice = parseInt(product.price) - parseInt(product.discount);
        res.render('item_detail', {
            title: product  .name,
            product: product,
            imageUrlArr: product.urlImage.split(constant.urlImageSeperator)
        });
    } else {
        res.render('error', {
            title: 'Lỗi tìm kiếm sản phẩm',
            message: "Lỗi không tìm thấy sản phẩm"
        })
    }
};
const cart = async (req, res, next) => {
  var productId = req.params.id;
  console.log(productId);
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  const product = await Product.getProductById(productId);
  console.log(product);
  cart.add(product, productId);
  console.log(cart);
  req.session.cart = cart;
  res.redirect('/');
};
module.exports = {
    product,
    // productCategory,
    // productstore,
    productDetail,
    cart
};
