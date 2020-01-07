const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const Bill = mongoose.model('Bill');
const StoreModel = require('./store');
const constant = require('../Utils/constant');


module.exports = {
  getProduct(query, sort, perPage, page){
    return Product.find(query)
    .populate('store')
    .populate('category')
    .select({})
    .limit(perPage)
    .skip(perPage * (page - 1))
    .sort(sort)
    .exec();
  },
  getCount(query){
    return Product.count(query).exec();
  },
  getProductById(id){
    return Product.findOne({"productId": id})
        .populate('store')
        .populate('category')
        .exec();
  },
  getAllProduct(query, sort){
    return Product.find(query)
        .populate('store')
        .populate('category')
        .sort(sort)
        .exec();
  },
  addProduct(info){
   const product = new Product({
     new: info.new || false,
     name: info.name || "",
     urlImage: info.urlImage || "",
     imageUploadBy: info.imageUploadBy || 1,
     discount: info.discount || 0,
     price: info.price || 0,
     storeId:   info.storeId || 0,
     categoryId:  info.categoryId || 0,
     description:  info.description || "",
     purchaseCount: 0,
     createdDate: Date.now()
   });
   return product.save();
  },
  async increasePurchaseCount(productId, value){
    console.log(productId);
    const product = await Product.findOneAndUpdate({productId: productId}, {$inc: {purchaseCount: value}}).exec();
    console.log(product);
    await StoreModel.increasePurchaseCount(product.storeId, value);
    return Promise.resolve();
  },
  async statisticByDay(day){
    return new Promise( (resolve, reject) => {
      Bill.aggregate([
        {
          $match: {
            "purchaseDate": {
              $gte: new Date(Date.now() - constant.millisecondOfDay * day),
              $lte: new Date()
            }
          }
        },
        {
          $lookup: {
            from: 'billdetails',
            localField: 'billId',
            foreignField: 'billId',
            as: 'BillDetail'
          },
        },
        { $unwind: "$BillDetail" },
        {
          $group: {
            _id: "$purchaseDate",
            purchaseCount: {
              $sum: "$BillDetail.amount"
            }
          },
        },
        {
          $sort: { _id: 1}
        }
      ]).then((statistics) => {
        let result = Array(day).fill(0);
        const startDate = Date.now() - constant.millisecondOfDay * day;
        for (let statistic of statistics){
          result[Math.floor((statistic._id.getTime() - startDate) / constant.millisecondOfDay)] = statistic.purchaseCount;
        }
        resolve(result);
      });
    })
  },
  async statisticByWeek(weekRange, year) {
    return new Promise((resolve, reject) => {
      Bill.aggregate([
        {
          $match: {
            "purchaseDate": {
              $gte: new Date(Date.now() - constant.millisecondOfWeek * weekRange),
              $lte: new Date()
            }
          }
        },
        {
          $lookup: {
            from: 'billdetails',
            localField: 'billId',
            foreignField: 'billId',
            as: 'BillDetail'
          },
        },
        {$unwind: "$BillDetail"},
        {
          $group: {
            _id: {$week: "$purchaseDate"},
            purchaseCount: {
              $sum: "$BillDetail.amount"
            },
          },
        },
        {
          $sort: {_id: 1}
        }
      ]).then((statistics) => {
        const currentWeek = Math.floor((Date.now() - new Date(year + "/01/01" ).getTime()) / constant.millisecondOfWeek);
        const startWeek = (currentWeek - (weekRange - 1) + constant.numOfWeekPerYear - 1) % (constant.numOfWeekPerYear - 1);
        let result = Array(weekRange).fill(0);
        for (let statistic of statistics) {
          result[(statistic._id - startWeek + constant.numOfWeekPerYear) % (constant.numOfWeekPerYear - 1)] = statistic.purchaseCount;
        }
        let weeks = [];
        if (startWeek <= currentWeek){
          for (let i = startWeek; i <= currentWeek; i++)
            weeks.push(i);
        } else {
          for (let i = startWeek; i < constant.numOfWeekPerYear; i++)
            weeks.push(i);
          for (let i = 0; i <= currentWeek; i++)
            weeks.push(i);
        }
        resolve([result, weeks]);
      });
    })
  },
  async statisticByMonth(year){
    return new Promise( (resolve, reject) => {
      Bill.aggregate([
        {
          $match: {
            "purchaseDate": {
              $gte: new Date(year + "/01/01"),
              $lte: new Date(year + "/12/31")
            }
          }
        },
        {
          $lookup: {
            from: 'billdetails',
            localField: 'billId',
            foreignField: 'billId',
            as: 'BillDetail'
          },
        },
        { $unwind: "$BillDetail" },
        {
          $group: {
            _id: {$month: "$purchaseDate"},
            purchaseCount: {
              $sum: "$BillDetail.amount"
            }
          },
        },
        {
          $sort: { _id: 1}
        }
      ]).then((statistics) => {
        let result = Array(constant.numOfMonth).fill(0);
        for (let statistic of statistics){
          result[statistic._id - 1] = statistic.purchaseCount;
        }
        resolve(result);
      });
    })
  },
  async statisticByQuarter(year) {
    return new Promise((resolve, reject) => {
      Bill.aggregate([
        {
          $match: {
            "purchaseDate": {
              $gte: new Date(year + "/01/01"),
              $lte: new Date(year + "/12/31")
            }
          }
        },
        {
          $lookup: {
            from: 'billdetails',
            localField: 'billId',
            foreignField: 'billId',
            as: 'BillDetail'
          },
        },
        {
          $project:
              {
                "purchaseDate": "$purchaseDate",
                "BillDetail": "$BillDetail",
                "quarter":
                    {$cond:[{$lte:[{$month:"$purchaseDate"},3]},
                      0,
                    {$cond:[{$lte:[{$month:"$purchaseDate"},6]},
                      1,
                    {$cond:[{$lte:[{$month:"$purchaseDate"},9]},
                      2,
                      3]}]}]}
              }
        },
        {$unwind: "$BillDetail"},
        {
          $group: {
            _id: "$quarter",
            purchaseCount: {
              $sum: "$BillDetail.amount"
            }
          },
        },
        {
          $sort: {_id: 1}
        }
      ]).then((statistics) => {
        let result = Array(constant.numOfQuarter).fill(0);
        for (let statistic of statistics) {
          result[statistic._id] = statistic.purchaseCount;
        }
        resolve(result);
      });
    })
  },
  async statisticByYear(start, end) {
    return new Promise((resolve, reject) => {
      Bill.aggregate([
        {
          $match: {
            "purchaseDate": {
              $gte: new Date(start + "/01/01"),
              $lte: new Date(end + "/12/31")
            }
          }
        },
        {
          $lookup: {
            from: 'billdetails',
            localField: 'billId',
            foreignField: 'billId',
            as: 'BillDetail'
          },
        },
        {$unwind: "$BillDetail"},
        {
          $group: {
            _id: {$year: "$purchaseDate"},
            purchaseCount: {
              $sum: "$BillDetail.amount"
            }
          },
        },
        {
          $sort: {_id: 1}
        }
      ]).then((statistics) => {
        const numOfYear = end - start + 1;
        let result = Array(numOfYear).fill(0);
        for (let statistic of statistics) {
          result[(statistic._id  - start) % numOfYear] = statistic.purchaseCount;
        }
        resolve(result);
      });
    })
  },
  searchProduct (keyword, perPage, page) {
      return Product.find({
        name:  { "$regex": keyword, "$options": "ig" }
        })
          .populate('store')
          .populate('category')
          .limit(perPage)
          .skip(perPage * (page - 1))
          .sort({createdDate: -1})
          .exec();
  },
  countSearchProduct (keyword) {
    return Product.count({
      name:  { "$regex": keyword, "$options": "ig" }
    }).exec();
  },
  advancedSearch(query, perPage, page){
    return Product.find(query)
        .populate('store')
        .populate('category')
        .limit(perPage)
        .skip(perPage * (page - 1))
        .sort({createdDate: -1})
        .exec();
  },
  countAdvancedSearchProduct (query) {
    return Product.count(query).exec();
  },
};
