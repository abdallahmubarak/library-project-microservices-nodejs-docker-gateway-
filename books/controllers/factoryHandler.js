//const Api = require('../utils/ApiFeatures')

exports.deleteOne = (Model) => async (req, res, next) => {

    const document = await Model.findByIdAndDelete(req.params.id)
		if (!document) return res.status(404) , {msg:'this document is not found'}
		res.status(204).json({
			status: 'success',
			data: null,
		})
	}

exports.updateOne =(Model) => async (req, res, next) => {

		const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		})
		if (!document) return res.status(404),{msg: 'this document is not found'}
		document.save()
		res.status(202).json({
			status: 'success',
			data: {
				document,
			},
		})
	}

exports.createOne = (Model) => async (req, res, next) => {
		// if (req.file) console.log(req.file)
		const document = await Model.create(req.body)
		res.status(200).json({
			status: 'success',
			data: {
				document,
			},
		})
	}

exports.getOne = (Model) => async (req, res, next) => {

		const document = await Model.findById(req.params.id)
		if (!document) return res.status(404),{msg:'this document is not found'}
		res.status(200).json({
			status: 'success',
			data: {
				document,
			},
		})
	}
/*
exports.getAll = (Model) => async (req, res, next) => {
		// nested route in category/categoryId/subCategory
		let filter = {}
		if (req.filterObj) filter = req.filterObj
		// nested route in products/productId/reviews

		const docsCount = await Model.countDocuments()
		const features = new Api(Model.find(filter), req.query)
			.filtering()
			.sort()
			.projection()
			.pagination(docsCount)
			.search()
		const { paginationFeatures, query } = features
		const docs = await query
		res.status(200).json({
			status: 'success',
			result: docs.length,
			paginationFeatures,
			data: {
				docs,
			},
		})
	}
*/