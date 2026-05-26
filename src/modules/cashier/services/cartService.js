//Cart calculations
//Add/remove cart logic
// Cart service

const calculateCartTotal = (items) => {
  return items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
};

const countCartItems = (items) => {
  return items.length;
};

module.exports = {
  calculateCartTotal,
  countCartItems,
};
