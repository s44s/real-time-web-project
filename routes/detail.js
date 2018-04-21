var express = require('express');
var router = express.Router();

router.get('/:id', function(req, res, next) {
	var id = req.params.id

	 res.render('detail/detail', {
		 id: id
	 });
	});


module.exports = router;
