const mongoose = require("mongoose");

const taxReportSchema = new mongoose.Schema(
  {
    taxAmount: {
      type: Number,
      default: 0,
    },

    taxType: {
      type: String,
      required: true,
    },

    reportPeriod: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("TaxReport", taxReportSchema);
