const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization'];
  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }
  
  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }
  try {
    // console.log(req.body.token);
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    next();
  } catch {
    return res.status(401).json({
      message: 'Auth failed',
    })
  }
  // if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
  //   jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function (err, decode) {
  //     if (err) req.user = undefined;
  //     req.user = decode;
  //     next();
  //   });
  // } else {
  //   req.user = undefined;
  //   // next();
  // }
}