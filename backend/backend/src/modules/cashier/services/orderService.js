//Calculate order total
//Create order logic
//Reusable business logic
// Order service

// Order service

const calculateTotal = (products) => {
  return products.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
};

const generateOrderNumber = () => {
  return `ORD-${Date.now()}`;
};

module.exports = {
  calculateTotal,
  generateOrderNumber,
};
