const { UserModel, LeaveModel } = require("../models");
const { PutObjectCommand, S3Client } = require("@aws-sdk/client-s3");
const { send_leave_requestmsg } = require("../controllers/email");
const fs = require("fs");
const path = require("path");

const client = new S3Client({
  region: "us-east-1",
});

const newDocument = (req, res) => {
  const bulkOps = req.body.map((item) => ({
    updateOne: {
      filter: { email: item.email },
      update: {
        $push: {
          documents: {
            ...item,
          },
        },
      },
      upsert: true,
    },
  }));

  try {
    const result = UserModel.bulkWrite(bulkOps);
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
    });
  }
};

// get document data
const getDocument = (req, res) => {
  UserModel.findOne({ email: req.params.id }, { documents: 1 }, (err, doc) => {
    if (err) return res.json({ message: "An error occured, try again" });
    if (!doc) {
      return res.json({
        message: "No data found",
      });
    }
    if (doc) return res.json(doc);
  });
};

const approve_document = (req, res) => {
  UserModel.findOneAndUpdate(
    {
      email: req.body.user,
      "documents._id": req.body.doc_id,
    },
    {
      $set: {
        "documents.$.verified": true,
      },
    },
    (err, doc) => {
      if (err) return res.json({ message: "An error occured, try again" });
      if (!doc) {
        return res.json({
          message: "No data found",
        });
      }
      if (doc) {
        return res.json({
          success: true,
        });
      }
    }
  );
};

const uploadDocuments_to_AWS = async (req, res) => {
  const subString = "https://emsbucket.s3.amazonaws.com/";
  const uploadPromises = [];
  const objectURLs = [];

  req.files.forEach(async (file) => {
    const fileStream = fs.createReadStream(file.path);
    let objectKey = file.originalname.trim();
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${objectKey}`,
      Body: fileStream,
    });
    const uploadPromise = client.send(command);
    objectURLs.push(`${subString}${objectKey}`);
    uploadPromises.push(uploadPromise);
  });

  try {
    await Promise.all(uploadPromises);
    const query = {
      email: req.body.user,
      "documents._id": req.body.docID,
    };
    const bulkOps = objectURLs.map((item) => ({
      updateOne: {
        filter: query,
        update: {
          $push: {
            "documents.$.images": item,
          },
          $set: {
            "documents.$.submitted": true,
          },
        },
        upsert: true,
      },
    }));
    await UserModel.bulkWrite(bulkOps);
    res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
    });
  }
};

const get_submitted_docs = (req, res) => {
  UserModel.aggregate(
    [
      { $match: { email: req.params.id } },
      {
        $project: {
          documents: {
            $filter: {
              input: "$documents",
              as: "doc",
              cond: { $eq: ["$$doc.submitted", true] },
            },
          },
        },
      },
    ],
    (err, doc) => {
      if (err) return res.json({ message: "An error occured, try again" });
      if (!doc) {
        return res.json({
          message: "No data found",
        });
      }
      if (doc) {
        return res.json(doc[0]);
      }
    }
  );
};

const getDocObjects_forEvents = (req, res) => {
  UserModel.aggregate(
    [
      {
        $project: {
          documents: {
            $filter: {
              input: "$documents",
              as: "document",
              cond: {
                $or: [
                  {
                    $and: [
                      {
                        $or: [
                          {
                            $eq: ["$$document.assignee", req.params.id],
                          },
                          {
                            $eq: ["$$document.assigner", req.params.id],
                          },
                        ],
                      },
                      {
                        $eq: ["$$document.verified", false],
                      },
                    ],
                  },
                  {
                    $and: [
                      { $ne: ["$$document.assigner", req.params.id] },
                      {
                        $isArray: "$$document.followers",
                      },
                      {
                        $gt: [
                          {
                            $size: {
                              $filter: {
                                input: "$$document.followers",
                                as: "follower",
                                cond: {
                                  $eq: ["$$follower.value", req.params.id],
                                },
                              },
                            },
                          },
                          0,
                        ],
                      },
                    ],
                  },
                ],
              },
            },
          },
        },
      },
      {
        $match: {
          documents: { $ne: [] },
        },
      },
    ],
    function (err, docs) {
      if (err) {
        return res.json({
          message: err,
        });
      } else {
        res.status(200).json(docs);
      }
    }
  );
};

const set_reportingManager = (req, res) => {
  const filter = { email: req.body.email };
  const newValues = { $set: { reportingManager: req.body.rmdata } };
  UserModel.findOneAndUpdate(filter, newValues, { new: true }, (err, doc) => {
    if (err) {
      return res.json({
        message: err,
      });
    } else if (doc) {
      res.status(200).json({
        message: "successfully updated",
        managers: doc?.reportingManager,
      });
    }
  });
};

const set_Senior_reportingManager = (req, res) => {
  const filter = { email: req.body.email };
  const newValues = { $set: { seniorReportingManager: req.body.rmdata } };
  UserModel.findOneAndUpdate(filter, newValues, { new: true }, (err, doc) => {
    if (err) {
      return res.json({
        message: err,
      });
    } else if (doc) {
      res.status(200).json({
        message: "successfully updated",
        managers: doc?.seniorReportingManager,
      });
    }
  });
};
const update_edit_fields = (req, res) => {
  const filter = { email: req.body.email };
  const attribute = req.body.fieldName;
  const newValues = { $set: { [attribute]: req.body.fieldValue } };
  UserModel.updateOne(filter, newValues, (err, doc) => {
    if (err) {
      return res.json({
        message: err,
      });
    } else if (doc) {
      res.status(200).json({ message: "successfully updated" });
    }
  });
};
const new_leave_request = async (req, res) => {
  const newLeave = new LeaveModel({
    ...req.body,
  });
  newLeave
    .save()
    .then((savedLeave) => {
      res.send("Leave request sent successfully");
    })
    .catch((error) => {
      res.status(500).send("Failed to send leave request");
    });
};

const getLeaveDataByUserID = async (req, res) => {
  try {
    const { userID } = req.query;
    const leaveData = await LeaveModel.find({ userID: userID }).lean().exec();
    res.json(leaveData);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve leave data" });
  }
};

const rej_approve_leave = async (req, res) => {
  const filter = { _id: req.body.leaveID };
  LeaveModel.updateOne(
    filter,
    {
      $set: { status: req.body.leaveResponse },
    },
    (err, doc) => {
      if (err) {
        return res.json({
          message: err,
        });
      } else if (doc) {
        res.status(200).json({ message: "successfully updated" });
      }
    }
  );
};

module.exports = {
  newDocument,
  getDocument,
  uploadDocuments_to_AWS,
  approve_document,
  get_submitted_docs,
  getDocObjects_forEvents,
  set_reportingManager,
  set_Senior_reportingManager,
  update_edit_fields,
  new_leave_request,
  getLeaveDataByUserID,
  rej_approve_leave,
};
