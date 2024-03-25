const factory =require('../controllers/factoryHandler')
const subCategory = require('../models/subCategory')

exports.createSubCategory = factory.createOne(subCategory)
exports.getSubCategory = factory.getOne(subCategory)
//exports.getAllSubCategory = factory.getAllCategory(subCategory)
exports.updateSubCategory = factory.updateOne(subCategory)
exports.deleteSubCategory = factory.deleteOne(subCategory)