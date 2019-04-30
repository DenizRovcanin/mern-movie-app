const router = require('express').Router();

router.use('/user', require('../user'));
router.use('/movies', require('../movies'));

module.exports = router;
