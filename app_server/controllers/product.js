const Product = require('../models/product');

const product = (req, res) => {
<<<<<<< HEAD
    var perPage = 9;
    var page = parseInt(req.query.p) || 1;
    var originalUrl = req.originalUrl;
    var category = req.query.category;
    var source = req.query.source;
    if(category === 'phone'){
        Product.find({"category": "phone"})
        .select({})
        .limit(perPage)
        .skip(perPage * (page - 1))
        .sort({
            name: 'asc'
        })
        .exec(function(err, products) {
            Product.count({"category": "phone"}).exec(function(err, count) {
                res.render('product', { 
                    title: 'Điện thoại',
                    url: '/product?category=phone',
                    user: (req.isAuthenticated) ? req.user : null, 
                    products: products, 
                    pagination: { page: page, pageCount: Math.ceil(count / perPage)}
                });
            })
        });
    } else if (category === 'laptop') {
        Product.find({"category": "laptop"})
        .select({})
        .limit(perPage)
        .skip(perPage * (page - 1))
        .sort({
            name: 'asc'
        })
        .exec(function(err, products) {
            Product.count({"category": "laptop"}).exec(function(err, count) {
                res.render('product', { 
                    title: 'Laptop', 
                    url: '/product?category=laptop',
                    user: (req.isAuthenticated) ? req.user : null, 
                    products: products, 
                    pagination: { page: page, pageCount: Math.ceil(count / perPage)}
                });
            })
        });
    } else if (category === 'tablet') {
        Product.find({"category": "tablet"})
        .select({})
        .limit(perPage)
        .skip(perPage * (page - 1))
        .sort({
            name: 'asc'
        })
        .exec(function(err, products) {
            Product.count({"category": "tablet"}).exec(function(err, count) {
                res.render('product', { 
                    title: 'Tablet', 
                    url: '/product?category=tablet',
                    user: (req.isAuthenticated) ? req.user : null, 
                    products: products, 
                    pagination: { page: page, pageCount: Math.ceil(count / perPage)}
                });
            })
        });
    } else if (category === 'watch') {
        Product.find({"category": "watch"})
        .select({})
        .limit(perPage)
        .skip(perPage * (page - 1))
        .sort({
            name: 'asc'
        })
        .exec(function(err, products) {
            Product.count({"category": "watch"}).exec(function(err, count) {
                res.render('product', { 
                    title: 'Watch',
                    url: '/product?category=watch', 
                    user: (req.isAuthenticated) ? req.user : null, 
                    products: products, 
                    pagination: { page: page, pageCount: Math.ceil(count / perPage)}
                });
            })
        });
    } else if (source === 'apple') {
        Product.find({"source": "apple"})
        .select({})
        .limit(perPage)
        .skip(perPage * (page - 1))
        .sort({
            name: 'asc'
        })
        .exec(function(err, products) {
            Product.count({"source": "apple"}).exec(function(err, count) {
                res.render('product', { 
                    title: 'Sản phẩm của Apple', 
                    url: '/product?source=apple',
                    user: (req.isAuthenticated) ? req.user : null, 
                    products: products, 
                    pagination: { page: page, pageCount: Math.ceil(count / perPage)}
                });
            })
        });
    } else if (source === 'samsung') {
        Product.find({"source": "samsung"})
        .select({})
        .limit(perPage)
        .skip(perPage * (page - 1))
        .sort({
            name: 'asc'
        })
        .exec(function(err, products) {
            Product.count({"source": "samsung"}).exec(function(err, count) {
                res.render('product', { 
                    title: 'Sản phẩm của Samsung', 
                    url: '/product?source=samsung',
                    user: (req.isAuthenticated) ? req.user : null, 
                    products: products, 
                    pagination: { page: page, pageCount: Math.ceil(count / perPage)}
                });
            })
        });
    } else if (source === 'other') {
        Product.find({"source": "other"})
        .select({})
        .limit(perPage)
        .skip(perPage * (page - 1))
        .sort({
            name: 'asc'
        })
        .exec(function(err, products) {
            Product.count({"source": "other"}).exec(function(err, count) {
                res.render('product', { 
                    title: 'Sản phẩm của những hãng khác', 
                    url: '/product?source=other',
                    user: (req.isAuthenticated) ? req.user : null, 
                    products: products, 
                    pagination: { page: page, pageCount: Math.ceil(count / perPage)}
                });
            })
        });
    } else {
        Product.find()
        .select({})
        .limit(perPage)
        .skip(perPage * (page - 1))
        .sort({
            name: 'asc'
        })
        .exec(function(err, products) {
            Product.count().exec(function(err, count) {
                res.render('product', { 
                    title: 'Tất cả sản phẩm', 
                    url: '/product',
                    user: (req.isAuthenticated) ? req.user : null, 
                    products: products, 
                    pagination: { page: page, pageCount: Math.ceil(count / perPage)}
                });
            })
        })
=======
    if (req.query.category){
        productCategory(req, res);
    } else if (req.query.source){
        productSource(req, res);
>>>>>>> cfe0987dcebb19bee4f74c30d24a8a89aabb4c8f
    }
}

const productCategory = async (req, res) => {
    const products = await Product.getProductByCategory(req.query.category);
    let title = "";
    switch(req.query.category){
        case "phone":
            title = "Điện thoại"
            break;
        case "laptop":
            title = "Laptop"
            break;
        case "tablet":
            title = "Tablet"
            break;
        case "watch":
            title = "Đồng hồ"
            break;
        default:
    }
    res.render('product', { title: title, products: products, user: (req.isAuthenticated) ? req.user : null });
};

const productSource = async (req, res) => {
    const products = await Product.getProductBySource(req.query.source);
    let title = "";
    switch(req.query.source){
        case "apple":
            title = "Sản phẩm của Apple";
            break;
        case "samsung":
            title = "Sản phẩm của Samsung";
            break;
        case "other":
            title = "Sản phẩm của hãng khác";
            break;
        default:
    }
    res.render('product', { title: title, products: products, user: (req.isAuthenticated) ? req.user : null });
};

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
    productCategory,
    productSource,
    productDetail,
}
