const { UserModel, DepModel } = require("../models");
const { sendEmailNotification } = require("./email");

// reg employee
const reg_new_employee = (req, res) => {
  UserModel.findOne({ email: req.body.email }, (err, doc) => {
    if (err) return res.json({ message: "An error occured, try again" });
    if (doc)
      return res.json({
        success: false,
        message: "Email Already exists, try using other email ID",
      });

    const newUser = new UserModel(req.body);
    newUser.companyID = req.user.companyID;
    newUser.companyName = req.user.companyName;
    let randomPassword = Math.random().toString(36).slice(-8);
    newUser.password = randomPassword;

    let data = {
      username: req.body.firstName,
      email: req.body.email,
      password: randomPassword,
    };
    newUser.save(async (err, doc) => {
      if (err) {
        if (err.code == "11000") {
          return res.json({
            success: false,
            message: "User Already exists with same Employee ID ",
          });
        } else {
          return res.json(err);
        }
      }
      let response = await sendEmailNotification(data);
      if (response) {
        res.status(200).json({ success: true });
      } else {
        return res.json({ message: "User is registered but email not sent" });
      }
    });
  });
};

const get_all_users = (req, res) => {
  const { companyID } = req.query;
  const query = {
    companyID: companyID, // Replace with the company ID you want to match
    role: { $ne: "Super-Admin" },
    archived: false,
  };
  UserModel.find(query, (err, docs) => {
    if (err) return res.json({ message: "An error occured, try again" });
    if (!docs) {
      return res.json({
        message: "No data found",
      });
    }

    if (docs) return res.json(docs);
  });
};

const get_all_archived_users = (req, res) => {
  const { companyID } = req.query;
  const query = {
    companyID: companyID, // Replace with the company ID you want to match
    role: { $ne: "Super-Admin" },
    archived: true,
  };
  UserModel.find(query, (err, docs) => {
    if (err) return res.json({ message: "An error occured, try again" });
    if (!docs) {
      return res.json({
        message: "No Users found",
      });
    }

    if (docs) return res.json(docs);
  });
};

const archive_user = (req, res) => {
  const { companyID, email } = req.query;
  console.log(companyID, email);

  UserModel.findOneAndUpdate(
    {
      companyID: companyID,
      email: email,
    },
    {
      $set: {
        archived: true,
      },
    },
    (err, docs) => {
      if (err) {
        console.log(err);
        return res.json({ message: "An error occured, try again" });
      }
      if (!docs) {
        return res.json({
          message: "No data found",
        });
      }

      if (docs) return res.json({ message: "User arachived Successfully" });
    }
  );
};

const get_all_users_emails = (req, res) => {
  UserModel.find(
    { companyID: req.params.id },
    {
      email: 1,
      _id: 0,
    },
    (err, emails) => {
      if (err) return res.json({ message: "An error occurred, try again" });
      if (!emails || emails.length === 0) {
        return res.json([]);
      }
      res.json(emails);
    }
  );
};

const add_departmnet = async (req, res) => {
  const { companyID, companyName, departmentName } = req.body;

  try {
    // Try to find the company by companyID
    let company = await DepModel.findOne({ companyID });

    if (!company) {
      // If the company does not exist, create a new one
      company = new DepModel({
        ...req.body,
        departments: [departmentName],
      });

      await company.save();
    } else {
      // If the company exists, update its departments array
      company.departments.push(departmentName);
      await company.save();
    }

    res.status(200).json({
      message: "Department added successfully",
      data: company.departments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const get_departments = async (req, res) => {
  const companyID = req.params.id;
  try {
    const department = await DepModel.findOne({ companyID });

    if (!department || department.departments.length === 0) {
      return res.status(200).json({ message: "No departments found" });
    }
    const { departments } = department;

    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  get_all_users,
  reg_new_employee,
  get_all_users_emails,
  add_departmnet,
  get_departments,
  archive_user,
  get_all_archived_users,
};
