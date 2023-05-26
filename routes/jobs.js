const express = require('express');
const { 
  getAllJobs, 
  getJobDetails,
  createJob,
  deleteJob,
  updateJob 
} = require('../controllers/jobs');

const router = express.Router();

router.route('/').get(getAllJobs).post(createJob);
router.route('/:id').get(getJobDetails).patch(updateJob).delete(deleteJob);

module.exports = router;