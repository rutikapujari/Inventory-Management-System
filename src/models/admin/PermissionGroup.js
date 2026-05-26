const mongoose = require("mongoose");

const permissionGroupSchema = new mongoose.Schema(
  {
    groupName: {
      type: String,
      required: true,
    },

    permissions: [
      {
        type: String,
      },
    ],

    description: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("PermissionGroup", permissionGroupSchema);
