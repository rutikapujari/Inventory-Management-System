const mongoose = require("mongoose");

const securitySettingSchema = new mongoose.Schema(
  {
    twoFactorAuth: {
      type: Boolean,
      default: false,
    },

    loginLimit: {
      type: Number,
      default: 5,
    },

    passwordPolicy: {
      type: String,
      default: "Strong",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("SecuritySetting", securitySettingSchema);
