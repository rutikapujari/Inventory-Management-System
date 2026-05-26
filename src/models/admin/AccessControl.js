const mongoose = require("mongoose");

const accessControlSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
    },

    module: {
      type: String,
      required: true,
    },

    canCreate: {
      type: Boolean,
      default: false,
    },

    canUpdate: {
      type: Boolean,
      default: false,
    },

    canDelete: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("AccessControl", accessControlSchema);
