const mongoose = require("mongoose");
const jobSchema = new mongoose.Schema(
  {
    description: {
      type: "String",
      required: true,
    },
    companyName: {
      type: "String",
      required: true,
    },
    position: {
      type: "String",
      required: true,
    },
    contract: {
      type: "String",
      required: true,
    },
    location: {
      type: "String",
      required: true,
    },
  },
  { timestamps: true }
);

const JobModel = mongoose.model("jobs", jobSchema);
module.exports = JobModel;
