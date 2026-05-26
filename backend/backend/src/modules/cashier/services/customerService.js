//Loyalty points
//Customer helper logic
// Customer service

const addLoyaltyPoints = (amount) => {
  return Math.floor(amount / 100);
};

const getCustomerType = (points) => {
  if (points >= 1000) {
    return "Gold";
  }

  if (points >= 500) {
    return "Silver";
  }

  return "Regular";
};

module.exports = {
  addLoyaltyPoints,
  getCustomerType,
};
