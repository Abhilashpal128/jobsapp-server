const express = require("express");
const router = express.Router();
const {
  createJob,
  ApplyForJob,
  getAllJobs,
  DeleteJob,
  fetchApplicationsOfUsers,
} = require("./controller");
const auth = require("../middleware/Authentication");

router.get("/allJobs", auth, getAllJobs);
router.post("/createjob", createJob);
router.post("/application", ApplyForJob);
router.delete("/delete/:userId/:id", DeleteJob);
router.post("/fetchApplicationsOfUsers", fetchApplicationsOfUsers);
module.exports = router;
