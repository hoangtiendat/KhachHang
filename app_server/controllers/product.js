// const mongoose = require('mongoose');
// const Product = mongoose.model('Product');
const Product = require('../models/product');
const Category = require('../models/category');
const Brand = require('../models/brand');

const product = async (req, res) => {

    var perPage = 6;
    var page = parseInt(req.query.p) || 1;
    var originalUrl = req.originalUrl;
    var category = req.query.category;
    var source = req.query.source;

    var json = '{';
    if(req.body.categoryType && req.body.categoryType != ''){
        json += '"categoryId":' + req.body.categoryType+'';
    } else if(req.params.category){
        json += '"categoryId":' + req.params.category+'';
    }
    if (json != '{' && req.body.sourceType && req.body.sourceType != ''){
        json += ', '
    }
    if(req.body.sourceType && req.body.sourceType != ''){
        json += '"storeId":' + req.body.sourceType+'';
    } else if(req.params.source){
        json += '"storeId":' + req.params.source+'';
    }
    json += '}';
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
        json: json,
        products: products, 
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

// const productSource = async (req, res) => {
//     const products = await Product.getProductBySource(req.query.source);
//     let title = "";
//     switch(req.query.source){
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
        source: product.source,
        user: (req.isAuthenticated) ? req.user : null
    });
};

module.exports = {
    product,
    // productCategory,
    // productSource,
    productDetail
};
