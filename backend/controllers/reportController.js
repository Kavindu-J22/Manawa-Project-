const Fee = require('../models/Fee');

// Generate daily report for a specific day
const generateDailyReport = async (req, res) => {
  try {
    const { date } = req.query;
    const fees = await Fee.find({ createdAt: { $gte: new Date(date), $lt: new Date(date).setDate(new Date(date).getDate() + 1) }, status: 'Paid' });
    
    const totalIncome = fees.length * 1000; // Example class fee is 1000 per class
    const institutionShare = totalIncome * 0.25;
    const teacherShare = totalIncome * 0.75;
    
    res.status(200).json({ totalIncome, institutionShare, teacherShare });
  } catch (error) {
    res.status(500).json({ message: 'Error generating report', error });
  }
};

module.exports = { generateDailyReport };
