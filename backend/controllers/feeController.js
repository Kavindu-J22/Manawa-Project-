const Fee = require('../models/Fee');
const Student = require('../models/Student');

// Mark fee payment for a student
const markFeePayment = async (req, res) => {
  try {
    const { studentId, month, year, status } = req.body;
    const fee = new Fee({ studentId, month, year, status });
    await fee.save();
    res.status(201).json(fee);
  } catch (error) {
    res.status(500).json({ message: 'Error marking fee payment', error });
  }
};

// Get fees by student
const getFeesByStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    const feeRecords = await Fee.find({ studentId });
    res.status(200).json(feeRecords);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving fee records', error });
  }
};

module.exports = { markFeePayment, getFeesByStudent };
