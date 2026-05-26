const SystemSettings = require("../../../models/admin/SystemSettings");

// ⚙️ GET SETTINGS
const getSettingsService = async () => {
  const settings = await SystemSettings.findOne();

  if (!settings) {
    throw new Error("Settings not found");
  }

  return settings;
};

// ✏️ UPDATE SETTINGS
const updateSettingsService = async (updateData) => {
  const updatedSettings = await SystemSettings.findOneAndUpdate(
    {},
    updateData,
    {
      new: true,
      upsert: true,
    }
  );

  return updatedSettings;
};

// 💰 UPDATE TAX
const updateTaxService = async (taxRate) => {
  const settings = await SystemSettings.findOneAndUpdate(
    {},
    { taxRate },
    { new: true }
  );

  if (!settings) {
    throw new Error("Failed to update tax settings");
  }

  return settings;
};

// 🛠️ TOGGLE MAINTENANCE MODE
const toggleMaintenanceService = async () => {
  const settings = await SystemSettings.findOne();

  if (!settings) {
    throw new Error("Settings not found");
  }

  settings.maintenanceMode = !settings.maintenanceMode;

  await settings.save();

  return settings;
};

module.exports = {
  getSettingsService,
  updateSettingsService,
  updateTaxService,
  toggleMaintenanceService,
};