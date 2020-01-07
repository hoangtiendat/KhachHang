const mongoose = require('mongoose');
const Comment = mongoose.model('Comment');

module.exports = {
  getCommentsByProduct(productId){
    return Comment.find({"productId": productId})
    .populate("user")
    .exec();
  },
  getCountByProduct(productId){
    return Comment.count({"productId": productId}).exec();
  },
  addComment(info){
  	const comment = new Comment({
  		userId: info.userId,
  		productId: info.productId,
  		content: info.comment || "",
  		createdDate: Date.now()
  	});
  	return comment.save();
  }
};