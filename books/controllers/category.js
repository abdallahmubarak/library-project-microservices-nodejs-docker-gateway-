const factory =require('../controllers/factoryHandler')
const Category = require('../models/category')

exports.createCategory = factory.createOne(Category)
exports.getCategory = factory.getOne(Category)
//exports.getAllCategory = factory.getAllCategory(Category)
exports.updateCategory = factory.updateOne(Category)
exports.deleteCategory = factory.deleteOne(Category)