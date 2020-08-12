const productModel = require('../models/product.model');

exports.getProducts = ((req, res, next) => {
  productModel.find((err, products) => {
    if (err) {
      next(err);
    } else {
      res.status(200).json(products);
    }
  })
})

exports.postProduct = ((req, res, next) => {
  let products = {
    name: req.body.name,
    price: req.body.price
  }
  res.status(200).json({
    message: 'Hanling Post requests to /products',
    createProduct: products
  })
})

exports.getProduct = ((req, res, next) => {
  const _id = req.params.productId;
  console.log(_id);
  productModel.findById(_id)
    .exec((err, product) => {
      if (err) {
        return next(err);
      } else {
        res.status(200).json(product);
      }
    })
})

