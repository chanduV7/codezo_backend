const { jobs, company ,users} = require("../mongoConfig");
const mongoDb = require("mongodb");

const addJob = async (req) => {
  const addone = await jobs.insertOne(req.body);
  const jobId = addone.insertedId;
  const cid = new mongoDb.ObjectId(req.body.cid);

  const d = await company.updateOne(
    { _id: cid },
    {
      $push: {
        jobs: jobId,
      },
    },
    {
      new: true,
    }
  );
  console.log(d);
  return addone;
};

const getAll = async (req) => {
  return jobs.find({}).toArray();
};
const getOne = async (req) => {
  const jobId = new mongoDb.ObjectId(req.params.jobId);
  return jobs.findOne({ _id: jobId });
};

const modify = async (req) => {
  const jobId = new mongoDb.ObjectId(req.params.jobId);
  return jobs.findOneAndUpdate(
    { _id: jobId },
    { $set: { ...req.body } },
    { new: true }
  );
};

const del = async (req) => {
  const jobId = new mongoDb.ObjectId(req.params.jobId);
  const cid = new mongoDb.ObjectId(req.params.cid);

  return {
    one: jobs.findOneAndDelete({ _id: jobId }),
    two: company.updateOne(
      {
        _id: cid,
      },
      {
        $pull: {
          jobs: jobId,
        },
      },
      {
        new: true,
      }
    ),
  };
};

const saveJob = async (req) => {
    const jobId = (req.body.jobId);
    const userId = new mongoDb.ObjectId(req.body.userId);
    return users.updateOne(
        { _id : userId },
        {
            $push : {
                savedjobs : jobId
            }
        },
        {
          new : true
        }
    )
};
module.exports = {
  addJob,
  saveJob,
  modify,
  getAll,
  getOne,
  del,
};
