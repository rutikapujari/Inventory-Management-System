//Payment calculations
//GST calculation
//Payment verification
// Payment service

const calculateGST = (amount) => {
  return amount * 0.18;
};

const calculateFinalAmount = (amount) => {
  const gst = calculateGST(amount);

  return amount + gst;
};

module.exports = {
  calculateGST,
  calculateFinalAmount,
};
