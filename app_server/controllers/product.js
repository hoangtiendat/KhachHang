// const mongoose = require('mongoose');
// const Product = mongoose.model('Product');
const Product = require('../models/product');
const Category = require('../models/category');
const Brand = require('../models/brand');
var Cart = require('../models/cart');

const product = async (req, res) => {

    var perPage = 6;
    var page = parseInt(req.query.p) || 1;
    var originalUrl = req.originalUrl;
    localStorage.setItem('myFirstKey', 'myFirstValue');
    if(req.body.categoryType){
        localStorage.setItem('category', req.body.categoryType);
    } else {
        localStorage.setItem('category', '');
    }
    if(req.body.storeType){
        localStorage.setItem('store', req.body.storeType);
    } else {
        localStorage.setItem('store', '');
    }
    if(req.body.priceType){
        localStorage.setItem('price', req.body.priceType);
    } else {
        localStorage.setItem('price', '');
    }

    var json = '{';
    if(req.body.categoryType && req.body.categoryType != ''){
        json += '"categoryId":"' + req.body.categoryType+'"';
    } else if(req.params.category){
        json += '"categoryId":"' + req.params.category+'"';
    }
    if (json != '{' && req.body.storeType && req.body.storeType != ''){
        json += ', ';
    }
    if(req.body.storeType && req.body.storeType != ''){
        json += '"storeId":"' + req.body.storeType+'"';
    } else if(req.params.store){
        json += '"storeId":"' + req.params.store+'"';
    }

    var price = '';
    if(req.body.priceType && req.body.priceType != ''){
        if (req.body.priceType == '3000000') {
            price = '{ "$lte" : 3000000 }';
        } else if (req.body.priceType == '7000000') {
            price = '{ "$gt" : 3000000, "$lte" : 7000000}';
        } else if (req.body.priceType == '10000000') {
            price = '{ "$gt" : 7000000, "$lte" : 10000000}';
        } else {
            price = '{ "$gt" : 10000000 }';
        }
    }

    if(price != ''){
        if (json != '{'){
            json += ', ';
        }
        json += '"price":' + price;
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
    const count = await Product.getCount(obj);
    const categories = await Category.getCategories();
    const brands = await Brand.getBrands();
    res.render('product', { 
        title: 'Sản phẩm',
        user: (req.isAuthenticated) ? req.user : null, 
        categories: categories,
        brands: brands,
        products: products,
        category: localStorage.getItem('category'),
        store: localStorage.getItem('store'),
        price: localStorage.getItem('price'),
        pagination: { page: page, pageCount: Math.ceil(count / perPage)}
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
    const product = await Product.getProductById(req.query.productId);
    res.render('item_detail', (!product)? {
        title: 'Sản phẩm'
    }: {
        title: 'Sản phẩm',
        new: product.new,
        name: product.name,
        discount: product.discount,
        price: product.price,
        urlImage: product.urlImage,
        category: product.category,
        store: product.store,
        user: (req.isAuthenticated) ? req.user : null
    });
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
