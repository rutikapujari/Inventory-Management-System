// controllers/settingsController.js

// Dummy settings data
let settings = {
  companyName: "My Inventory Store",
  companyEmail: "admin@gmail.com",
  currency: "INR",
  lowStockLimit: 10,
};


// ================= GET SETTINGS =================

const getSettings = async (req, res) => {
  try {

    res.status(200).json({
      success: true,
      settings,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// ================= UPDATE SETTINGS =================

const updateSettings = async (req, res) => {
  try {

    const {
      companyName,
      companyEmail,
      currency,
      lowStockLimit,
    } = req.body;

    // Update settings
    settings = {
      companyName,
      companyEmail,
      currency,
      lowStockLimit,
    };

    res.status(200).json({
      success: true,
      message: "Settings updated successfully",
      settings,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  getSettings,
  updateSettings,
};