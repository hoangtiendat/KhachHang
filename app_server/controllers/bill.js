const Bill = require('../models/bill');
const Product = require('../models/product');
const constant = require('../Utils/constant');

const bills = async (req, res) => {
    if (!req.isAuthenticated()){
        res.redirect('/login');
    } else {
        try {
            const page = parseInt(req.query.page) || 1;
            const bills  = await Bill.getBillInPage(page, req.user.userId);
            const count = await Bill.countBill(req.user.userId);
            res.render('history', {
                title: 'Đơn đặt hàng',
                bills: bills,
                page: page,
                pages: Math.ceil(count / constant.perPage),
            });
        } catch(err) {
            console.log('err', err);
        }
    }
};

const bill_detail = async (req, res) => {
    try {
        const billDetail = await Bill.getBill(req.params.billId);
        console.log(billDetail);
        console.log(billDetail.billDetail);
        billDetail.billDetail.forEach((detail) => {
            detail.product.salePrice = parseInt(detail.product.price) - parseInt(detail.product.discount);
            detail.product.urlImage = detail.product.urlImage.split(constant.urlImageSeperator)[0];
        });
        if (billDetail){
            res.render('bill_detail', {
                title: 'Đơn đặt hàng ' + billDetail.billId,
                billDetail: billDetail,
                billDetailChunks: constant.splitToChunk(billDetail.billDetail, 4),
            });
        } else {
            res.render('error', {
                title: 'Lỗi tìm kiếm đơn đặt hàng',
                message: "Lỗi không tìm thấy đơn đặt hàng"
            })
        }

    } catch(err){
        console.log('err', err);
    }
}

module.exports = {
    bills,
    bill_detail
}
