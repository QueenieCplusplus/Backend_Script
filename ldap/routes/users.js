var express = require('express');
var router = express.Router();
const ldap_search = require('../model/ldapDB');

/* GET users listing. 
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});*/


router.get("/users", async(req, res) => {
	const {search} = req.query;

	try {
	
	  const users = await ldap_search(search)

	} catch (error) {

	   return res.send({

            ok: false,
			message: error.message	  
				 
		});	
		   
	}

});


module.exports = router;
