const mongoose = require("mongoose");

const backupHistorySchema = new mongoose.Schema(
  {
    backupFile: {
      type: String,
      required: true,
    },

    backupDate: {
      type: Date,
      default: Date.now,
    },

    backupSize: {
      type: String,
      default: "0 MB",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("BackupHistory", backupHistorySchema);
