const express = require("express");
const router = express.Router();
const userRoutes = require("./user/routes");
const JobsRouter = require("./jobs/routes");

router.use("/user", userRoutes);
router.use("/jobs",JobsRouter);
module.exports = router;
