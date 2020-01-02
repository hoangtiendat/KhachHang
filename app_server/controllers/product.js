// const mongoose = require('mongoose');
// const Product = mongoose.model('Product');
const Product = require('../models/product');
const Category = require('../models/category');
const Brand = require('../models/brand');
const constant = require('../Utils/constant');

const product = async (req, res) => {
    var perPage = 6;
    var page = parseInt(req.query.p) || 1;
    var originalUrl = req.originalUrl;
    localStorage.setItem('myFirstKey', 'myFirstValue');
    if(req.body.categoryType){
        localStorage.setItem('category', req.body.categoryType || req.params.category);
    } else if (req.params.category) {
        localStorage.setItem('category', req.params.category);
    } else {
        localStorage.setItem('category', '');
    }
    if(req.body.brandType){
        localStorage.setItem('brand', req.body.brandType);
    } else if (req.params.brandId) {
        localStorage.setItem('brand', req.params.brandId);
    } else {
        localStorage.setItem('brand', '');
    }
    if(req.body.priceType){
        localStorage.setItem('price', req.body.priceType);
    } else {
        localStorage.setItem('price', '');
    }

    var json = '{';
    if(req.body.categoryType && req.body.categoryType !== ''){
        json += '"categoryId": ' + req.body.categoryType+'';
    } else if(req.params.category){
        json += '"categoryId": ' + req.params.category+'';
    }
    if (json !== '{' && req.body.brandType && req.body.brandType !== ''){
        json += ', ';
    }
    if(req.body.brandType && req.body.brandType !== ''){
        json += '"storeId": ' + req.body.brandType+'';
    } else if(req.params.brandId){
        json += '"storeId": ' + req.params.brandId+'';
    }

    var price = '';
    if(req.body.priceType && req.body.priceType !== ''){
        if (req.body.priceType === '3000000') {
            price = '{ "$lte" : 3000000 }';
        } else if (req.body.priceType === '7000000') {
            price = '{ "$gt" : 3000000, "$lte" : 7000000}';
        } else if (req.body.priceType === '10000000') {
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
        user: (req.isAuthenticated) ? req.user : null,
        products: products,
        category: localStorage.getItem('category'),
        brand: localStorage.getItem('brand'),
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
    const product = await Product.getProductById(req.params.productId);
    if (product){
        product.salePrice = parseInt(product.price) - parseInt(product.discount);
        product.description = product.description;
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

module.exports = {
    product,
    // productCategory,
    // productstore,
    productDetail
};
