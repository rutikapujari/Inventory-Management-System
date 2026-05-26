const mongoose = require("mongoose");

const employeeReportSchema = new mongoose.Schema(
  {
    employeeName: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      required: true,
    },

    attendance: {
      type: Number,
      default: 0,
    },

    performance: {
      type: String,
      default: "Good",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("EmployeeReport", employeeReportSchema);
