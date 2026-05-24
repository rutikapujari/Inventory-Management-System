const mongoose = require("mongoose");

const smsSettingSchema = new mongoose.Schema(
  {
    provider: {
      type: String,
      required: true,
    },

    apiKey: {
      type: String,
      required: true,
    },

    senderId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("SMSSetting", smsSettingSchema);
