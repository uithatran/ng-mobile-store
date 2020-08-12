const userModel = require('../models/user.model');
const productModel = require('../models/product.model');
const bcrypt = require('bcrypt');

const saltRounds = 10;

exports.getProducts = (req, res, next) => {
  productModel.find((err, products) => {
    if (err) {
      return next(err);
    } else {
      res.json(products);
    }
  })
}

exports.postProduct = (req, res, next) => {
  console.log("enter postProduct");
  req.body.imageFile = req.file.path.split('\\').slice(1).join('/');
  typeImage = req.file.mimetype.split('/').slice(1).join('');
  let Product = {
    productName: req.body.productName,
    unitPrice: req.body.unitPrice,
    unitInStock: req.body.unitInStock,
    description: req.body.description,
    manufacturer: req.body.manufacturer,
    category: req.body.category,
    condition: req.body.condition,
    imageFile: req.body.imageFile,
    typeImage: typeImage
  }

  productModel.create(Product, (err, product) => {
    if (err) {
      console.log('err in postProduct');
      return next(err);
    } else {
      res.status(200).json({
        message: 'Create product success'
      });
    }
  })
}

exports.deleteProduct = (req, res, next) => {
  console.log('this.deleteProduct conponent')
  const id = req.params.productId;
  console.log(req.params.productId);

  productModel.deleteOne({ _id: id }, (err) => {
    if (err) {
      return next(err);
    } else {
      res.status(200).json({
        message: "Detele user success!",
      })
    }
  })
}

exports.getUsers = (req, res, next) => {
  userModel.find((err, users) => {
    if (err) {
      return next(err);
    } else {
      res.json(users);
    }
  })
}

exports.postUsers = (req, res, next) => {
  let userData = {
    email: req.body.email,
    password: req.body.password
  }
  userModel.findOne({ email: userData.email }, (err, user) => {
    if (err) {
      return next(err);
    } else {
      if (user == null) {
        bcrypt.hash(userData.password, saltRounds, function (err, hash) {
          if (err) {
            return next(err);
          } else {
            userModel.create({ email: userData.email, password: hash }, (err, user) => {
              if (err) {
                return next(err);
              } else {
                res.status(200).json('Create user success');
              }
            })
          }
        });
      } else {
        return res.status(409).json({
          message: 'User exists'
        })
      }
    }
  })
}

exports.deleteUser = (req, res, next) => {
  const _id = req.params.userId;
  userModel.findByIdAndDelete(_id, (err) => {
    if (err) {
      return next(err);
    }
    res.status(200).json({
      message: "Detele user success!",
    })
  })
}