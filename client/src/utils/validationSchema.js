import * as Yup from "yup";

const user = JSON.parse(localStorage.getItem("user"));
export const registerSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  middleName: Yup.string().required("Required"),

  empID: Yup.string().required("Required"),
  loginID: Yup.string().email("Invalid email").required("Required"),

  designation: Yup.string().required("Required"),
  empType: Yup.mixed().required().oneOf(["Full Time", "Part Time", "Intern"]),

  empRoles: Yup.mixed().required().oneOf(["Super-Admin", "Admin", "Non-Admin"]),
  empStatus: Yup.mixed().required().oneOf(["Probation", "Permanent"]),
});

export const loginValidation = Yup.object().shape({
  password: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

export const init_registratin_values = {
  firstName: "",
  lastName: "",
  middleName: "",
  aliasName: "",
  empID: "",
  loginID: "",
  designation: "",
  empType: "Full Time",
  empRoles: "Non-Admin",
  empStatus: "Probation",
  reportingManager: "",
  seniorReportingManager: "",
  publicApplicable: true,
  customApplicable: false,
  cnic: false,
  department: "",
  permissions: [],
};

// export const update_initValues = {
//   firstName: "jaaan",
//   lastName: user.lastName,
//   middleName: user?.middleName,

//   whatsappNumber: user?.whatsappNumber,
//   cnic: user?.cnic,
//   profilePicture: user?.profilePicture,
//   presentAddress: user?.permanentAddress,
//   permanentAddress: user?.permanentAddress,

//   otherEmail: user?.otherEmail,
//   gmail: user?.gmail,

//   // nokName: user?.nok["nokName"],
//   // nokContact: user?.nok.nokContact,
//   // nokRelation: user?.nok.nokRelation,
// };

export const updateSchema = Yup.object().shape({
  firstName: Yup.string(),
  lastName: Yup.string(),
  middleName: Yup.string(),

  whatsappNumber: Yup.string(),
  cnic: Yup.string(),

  presentAddress: Yup.string(),
  permanentAddress: Yup.string(),

  otherEmail: Yup.string().email("Invalid email"),
  gmail: Yup.string().email("Invalid email"),

  nokName: Yup.string(),
  nokContact: Yup.string(),
  nokRelation: Yup.string(),
});
