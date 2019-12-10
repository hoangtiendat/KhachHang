const mongoose = require('mongoose');
const Product = mongoose.model('Product');

const product = (req, res) => {
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
    }
};

const productDetail = (req, res) => {
    Product.findOne({"id": req.query.id}, function(err, product) {
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
    });
};

module.exports = {
    product,
    productDetail,
}
