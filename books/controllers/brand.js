
const Brand = require('../models/brand');
const factory =require('./factoryHandler')



//exports.getAllBrands = factory.getAll(Brand)
exports.getBrand = factory.getOne(Brand)
exports.createBrand = factory.createOne(Brand)
exports.updateBrand = factory.updateOne(Brand)
exports.deleteBrand = factory.deleteOne(Brand)
