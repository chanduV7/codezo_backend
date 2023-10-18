const {jobs} = require("../mongoConfig")
const mongoDb =  require("mongodb")

const addJob = async(req) => {
    const addone = await jobs.insertOne(req.body);
    return addone
}
const getAll = async(req) => {
    return jobs.find({}).toArray();
}
const getOne = async(req) => {
    const jobId = new mongoDb.ObjectId(req.params.jobId);
    return jobs.findOne({ _id : jobId})
}

const modify= async(req) => {
    const jobId = new mongoDb.ObjectId(req.params.jobId);
    return jobs.findOneAndUpdate({ _id: jobId},{ $set: {...req.body}}, { new : true})
}

const del = async(req) => {
    const jobId = new mongoDb.ObjectId(req.params.jobId);
    return jobs.findOneAndDelete({_id: jobId})
}
module.exports = {
    addJob,
    modify,
    getAll,
    getOne,
    del
}