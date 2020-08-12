require('dotenv').config();

const express = require('express');
let bodyParser = require('body-parser');
var cors = require('cors');
const mongoose = require('mongoose');
// const multer = require('multer');
const checkAuth = require('./middleware/check-auth');

// let upload = multer({ dest: './public/uploads' });
const app = express();

// app.use('/uploads',express.static('./public/uploads'));
app.use(express.static('public'));
app.use(cors());

app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))

mongoose.connect("mongodb+srv://mobile-store:mobilestore@2109@cluster0-jqx0b.mongodb.net/db-mobilestore?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
mongoose.set('useCreateIndex', true);
//Lấy kết nối mặc định
var db = mongoose.connection;
// Added check for DB connection
if (!db)
  // console.log("Error connecting db")
  //Ràng buộc kết nối với sự kiện lỗi (để lấy ra thông báo khi có lỗi)
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
else
  console.info("Database connected successfully");

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   if (req.method === "OPTIONS") {
//     res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE');
//     return res.status(200).json({});
//   }
//   next();
// });

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const productRoutes = require('./routes/customer.route');
const authRoutes = require('./routes/auth.route');
const adminRoutes = require('./routes/admin.route');

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', checkAuth, adminRoutes);
// Check server working
app.use('/api/hello', (req, res, next) => {
  res.status(200).json({
    message: 'Hello World!!!',
  })
});

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
  res.status(200).json({
    message: 'It works!'
  })
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  })
})

module.exports = app;