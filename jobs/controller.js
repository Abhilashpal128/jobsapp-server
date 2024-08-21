const JobModel = require("../models/JobsModel");
const userModel = require("../models/userModal");

const createJob = async (req, res) => {
  try {
    const { description, companyName, position, contract, location } = req.body;
    console.log(description);

    if (!description || !companyName || !position || !contract || !location) {
      return res.status(404).send({ message: "All feilds are required" });
    }
    const jobData = new JobModel(req.body);
    const jobs = await jobData.save();
    console.log(jobs);

    return res
      .status(200)
      .send({ status: 200, message: "Job Created successfully", data: jobs });
  } catch (error) {
    console.log(error);
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
};

const ApplyForJob = async (req, res) => {
  try {
    const { job_id, email } = req.body;
    const userData = await userModel.findOne({ email });
    console.log(`userDataa`, userData);

    const isApplied = userData.applications.includes(job_id);
    if (isApplied) {
      return res.status(201).send({
        message: "Already Applied wait for their response",
        status: 400,
      });
    }
    userData.applications.push(job_id);
    const data = await userData.save();
    return res
      .status(200)
      .send({ status: 200, message: "Job Applied successfully", data: data });
  } catch (error) {
    return res.status(500).send({ message: error.message, error: error });
  }
};

const getAllJobs = async (req, res) => {
  try {
    const AllJobData = await JobModel.find();
    return res
      .status(200)
      .send({ message: "Jobs Fetched Successfully", data: AllJobData });
  } catch (error) {
    return res.status(500).send({ message: error.message, error: error });
  }
};

const DeleteJob = async (req, res) => {
  try {
    const { id, userId } = req.params;
    const userData = await userModel.findOne({ _id: userId });
    const isAdmin = userData.isAdmin;
    console.log(isAdmin);

    if (isAdmin) {
      const DeletedData = await JobModel.deleteOne({ _id: id });
      return res.status(200).send({
        status: 200,
        message: "Job deleted successfully",
        data: DeletedData,
      });
    }
    return res
      .status(201)
      .send({ status: 400, message: "Only admins can delete jobs" });
  } catch (error) {
    return res.status(500).send({ message: error.message, error: error });
  }
};

const fetchApplicationsOfUsers = async (req, res) => {
  try {
    const { id } = req.body;
    const userData = await userModel
      .findOne({ _id: id })
      .populate("applications") // This replaces the job IDs with full Job documents
      .exec();

    console.log(userData);
    return res
      .status(200)
      .json({ message: "Applications Fetched successfully", data: userData });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "something went wrong", error: error.message });
  }
};

module.exports = {
  createJob,
  ApplyForJob,
  getAllJobs,
  DeleteJob,
  fetchApplicationsOfUsers,
};
