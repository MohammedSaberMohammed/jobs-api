const { StatusCodes } = require("http-status-codes");
const Job = require("../models/jobs");
const { NotFoundError, BadRequestError } = require("../errors");

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user._id }).sort('createdAt')

  res.status(StatusCodes.OK).json({
    jobs,
    nbHits: jobs.length
  });
}

const getJobDetails = async (req, res) => {
  const {
    user: { _id: userId },
    params: { id: jobId }
  } = req;
  const job = await Job.findOne({ _id: jobId, createdBy: userId });
  
  if(!job) {
    throw new NotFoundError(`No job found with id ${jobId}`);
  }

  res.status(StatusCodes.OK).json(job);
}

const createJob = async (req, res) => {
  req.body.createdBy = req.user._id;
  const job = await Job.create(req.body);

  res.status(StatusCodes.CREATED).json(job);
}

const deleteJob = async (req, res) => {
  const {
    user: { _id: userId },
    params: { id: jobId }
  } = req;

  const job = await Job.findByIdAndRemove({ _id: jobId, createdBy: userId })

  if(!job) {
    throw new NotFoundError(`No job found with id ${jobId}`);
  }

  res.status(StatusCodes.OK).json(job);
}

const updateJob = async (req, res) => {
  const {
    body: { company, position },
    user: { _id: userId },
    params: { id: jobId }
  } = req;

  if(!company || !position) {
    throw new BadRequestError('Company or Position fields cannot be empty');
  }

  const job = await Job.findByIdAndUpdate({
    _id: jobId, createdBy: userId 
  }, req.body, {
    new: true,
    runValidators: true
  });

  if(!job) {
    throw new NotFoundError(`No job found with id ${jobId}`);
  }

  res.status(StatusCodes.OK).json(job);
}

module.exports = {
  getAllJobs,
  getJobDetails,
  createJob,
  deleteJob,
  updateJob
};