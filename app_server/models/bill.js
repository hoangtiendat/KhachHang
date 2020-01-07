const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const ProductModel = require('./product');
const Bill = mongoose.model('Bill');
const BillDetail = mongoose.model('BillDetail');
const Store = mongoose.model('Store');
const Brand = mongoose.model('Brand');
const constant = require('../Utils/constant');

module.exports = {
    getBillInPage(page, userId){
        return Bill.find({"buyerId":userId})
            .skip((constant.perPage * page) - constant.perPage)
            .limit(constant.perPage)
            .sort({purchaseDate: -1})
            .populate("buyer")
            .exec();
    },
    countBill(userId){
        return Bill.count({"buyerId":userId}).exec();
    },
    getBill(billId){
        return Bill.findOne({billId: billId})
            .populate({
                path: "billDetail",
                populate: "product"
            })
            .populate("buyer")
            .exec();
    },
    addBillDetail(billId, productId, amount){
        const billDetail = new BillDetail({
            billId: billId,
            productId: productId,
            amount: amount
        });
        return billDetail.save();
    },
    async addBill(cart, info){
        try {

            const bill = new Bill({
                buyerId: info.buyerId,
                receiverName: info.receiverName || "",
                phone: info.phone || "",
                email: info.email || "",
                address: info.address || "",
                city: info.city || "",
                description: info.description || "",
                totalPrice: cart.totalPrice || 0,
                shipCharge: ((cart.totalPrice) / 50) || constant.defaultShipCharge,
                purchaseDate: info.purchaseDate || Date.now(),
                deliveryDate: "",
                status: constant.billDefaultStatus,
            });
            const result = await bill.save();
            console.log(cart.getItems())
            for (let product of cart.getItems()){
                await this.addBillDetail(bill.billId, product.item.productId, product.quantity);
                await ProductModel.increasePurchaseCount(product.item.productId, product.quantity);
            }
            return result;
        } catch(err){
            console.log(err);
        }
    },
    setStatus(billId, status){
        if (status === constant.billStatus.complete){
            return Bill.findOneAndUpdate({billId}, {status: status, deliveryDate: Date.now()}).exec();
        }
        return Bill.findOneAndUpdate({billId}, {status: status}).exec();
    }
};
