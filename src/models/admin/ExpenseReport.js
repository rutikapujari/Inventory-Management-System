const mongoose = require("mongoose");

const expenseReportSchema = new mongoose.Schema(
  {
    expenseType: {
      type: String,
      required: true,
    },

    expenseAmount: {
      type: Number,
      required: true,
    },

    expenseDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("ExpenseReport", expenseReportSchema);
