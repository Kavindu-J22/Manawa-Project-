const express = require('express');
const { markFeePayment, getFeesByStudent } = require('../controllers/feeController');
const router = express.Router();

router.post('/mark', markFeePayment);
router.get('/:id', getFeesByStudent);

module.exports = router;
