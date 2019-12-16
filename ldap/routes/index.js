var express = require('express');
var router = express.Router();

/* GET home page. 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/

router.get("/",(req, res) => {

   return res.send({

	ok: true,
        date: new Date()

   });
   
   console.log("proceed the index.get router");

});


module.exports = router;
