
const {company,jobs, users} = require("../mongoConfig");
const mongodb = require("mongodb")

const addCompany = async(req) => {
    const addone =  await company.insertOne(req.body);
    return addone;
}

const getOneCompany = async(req) => {
    const cid = new mongodb.ObjectId(req.params.cid);
    return company.findOne({ _id : cid})
}
const getAllCompany = () => {
    return company.find({}).toArray();
}

const getCompanyJobs = async(req) => {
  const companyId = new mongodb.ObjectId(req.params.cid);
  const companyData = await company.findOne(companyId);
  const jobIds = companyData.jobs;
  const jobsPromise = jobIds.map((e) => jobs.findOne(e));
  return Promise.allSettled(jobsPromise);
}

const deleteCompany = async(req) => {
   const cid = new mongodb.ObjectId(req.params.cid);
   return company.findOneAndDelete({_id : cid})
}
const followCompany = async (req) => {
    const cid = new mongodb.ObjectId(req.params.cid);
    const userId = new mongodb.ObjectId(req.params.userId)
    return users.updateOne(
        { _id : userId },
        {
            $push : {
                followingComp : cid
            }
        },
        {
          new : true
        }
    )
};

module.exports = {
    addCompany,
    getAllCompany,
    followCompany,
    getCompanyJobs,
    deleteCompany,
    getOneCompany
}