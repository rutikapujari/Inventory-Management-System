const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    reportName: {
      type: String,
      required: true,
    },

    reportType: {
      type: String,
      required: true,
    },

    generatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Report", reportSchema);
