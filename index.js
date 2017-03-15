
var express = require('express');
var request = require('request');
var cors = require('cors');
var qiniu = require('qiniu');

var app = express();

app.use(cors());

// Log proxy requests
var morgan  = require('morgan');
app.use(morgan('dev'));

app.get('/test', function (req, res) {
  res.send('Hello World!')
});


//  七牛文件上传需要获取token
//需要填写你的 Access Key 和 Secret Key
//https://portal.qiniu.com/user/key
qiniu.conf.ACCESS_KEY = 'eBdhn3esJIRJzn1KozrdcFLH20DwCGzCDkvAeu2Z';
qiniu.conf.SECRET_KEY = 'YwpV7BtQVvicQD5Ed-zRnJyv-jCB2vb0qiNxteTl';

app.get('/uptoken', function(req, res, next) {

  var uptoken = new qiniu.rs.PutPolicy('ape-note');
  var token = uptoken.token();

  if (token) {
      res.json({
          uptoken: token
      });
  }
});

app.listen(3000, function () {
  console.log('Example app listening on port http://localhost:3000!')
});
