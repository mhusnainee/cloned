import React, { useEffect, useState } from "react";
import DatePicker from "react-multi-date-picker";
import { Formik, Form, Field } from "formik";
import {
  init_registratin_values,
  registerSchema,
} from "../utils/validationSchema";
import { MultiSelect } from "react-multi-select-component";
import { register_User, get_users_emails_only } from "../auth/authService";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getTheme } from "../store/themeSlice";
import { datePlaceHolder } from "../utils/static";
import { getdepartments } from "../API/department_calls";
import SvgLoading from "./spinners/SvgLoading";
import { loadingSvg } from "../assets/icons";

const Register = () => {
  const theme = useSelector(getTheme);
  const [optionss, setOptions] = useState([]);
  const [permissionOptions, setPermissionOptions] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [reportingManager, setReportingManager] = useState([]);
  const [srreportingManager, setSrreportingManager] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const notify = (msg, type) =>
    toast(msg, { position: "top-center", type: type });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setPermissionOptions([
      // { label: "Enroller", value: "Enroller" },
      { label: "HR Manager", value: "HR Manager" },
      // { label: "Reporting Manager", value: "Reporting Manager" },
      { label: "Roster Manager", value: "Roster Manager" },
      { label: "Settings Manager", value: "Settings Manager" },
      { label: "Permissions Manager", value: "Permissions Manager" },
    ]);
    setDataLoading(true);
    await getdepartments().then((res) => {
      setDepartments(res.data);
    });
    await get_users_emails_only().then((ress) => {
      let dropdownData = ress.data.map((item) => {
        return { label: item.email, value: item.email };
      });
      setOptions(dropdownData);
    });
    setDataLoading(false);
  };

  return (
    <div className="">
      {dataLoading && (
        <div className="max-w-[750px]">
          <SvgLoading />
        </div>
      )}

      {!dataLoading &&
        (departments.length ? (
          <div className="md:w-[750px] bg-gray-50 dark:bg-sfy w-full text-black dark:text-white duration-500 p-4 rounded-md">
            <Formik
              initialValues={init_registratin_values}
              validationSchema={registerSchema}
              onSubmit={(values, actions) => {
                setSubmitLoading(true);
                values.reportingManager = reportingManager;
                values.seniorReportingManager = srreportingManager;
                values.permissions = permissions.map((item) => item.value);
                if (!values.department) {
                  values.department = departments[0];
                }
                register_User(values)
                  .then((res) => {
                    setSubmitLoading(false);
                    if (res.data.success) {
                      setReportingManager([]);
                      setSrreportingManager([]);
                      setPermissions([]);
                      notify("User registered successfully!", "success");
                      actions.resetForm();
                    } else {
                      notify("Something bad happened!", "error");
                    }
                  })
                  .catch((error) => {
                    setSubmitLoading(false);
                    notify(error.message, "error");
                  });
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleSubmit,
                actions,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between border-b dark:border-b-black duration-500 pb-4 mx-6">
                      <div className="">
                        <h1 className="text-xl text-black dark:text-white duration-500">
                          Register Employee
                        </h1>
                      </div>
                    </div>
                    <div className="mt-2 w-[250px] sm:w-full md:p-6 p-4 mx-auto grid gap-4 mb-4 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="name"
                          className="block mb-2 text-sm font-medium"
                        >
                          Login ID{" "}
                          <span className="text-red-700 dark:text-black duration-500">
                            *
                          </span>
                        </label>
                        <Field
                          onChange={handleChange}
                          type="text"
                          name="loginID"
                          autoComplete="off"
                          id="loginID"
                          className="bg-white border outline-none duration-500 border-gray-300 text-gray-900 text-sm rounded-[5px] focus:ring-primary-600 dark:focus:ring-black dark:focus:border-black focus:border-primary-600 block w-full p-2.5 "
                          placeholder="muhammad.umair@synapsify.tech"
                        />
                        {errors.loginID && touched.loginID ? (
                          <div className="text-red-700 dark:text-black duration-500 text-sm">
                            {errors.loginID}
                          </div>
                        ) : null}
                      </div>
                      <div>
                        <label
                          htmlFor="name"
                          className="block mb-2 text-sm font-medium"
                        >
                          Employee ID{" "}
                          <span className="text-red-700 dark:text-black duration-500">
                            *
                          </span>
                        </label>
                        <Field
                          onChange={handleChange}
                          type="text"
                          name="empID"
                          id="empID"
                          autoComplete="off"
                          className="bg-white border outline-none duration-500 border-gray-300 text-gray-900 text-sm rounded-[5px] focus:ring-primary-600 dark:focus:ring-black dark:focus:border-black focus:border-primary-600 block w-full p-2.5 "
                          placeholder="umair004"
                        />
                        {errors.empID && touched.empID ? (
                          <div className="text-red-700 dark:text-black duration-500 text-sm">
                            {errors.empID}
                          </div>
                        ) : null}
                      </div>
                      <div>
                        <label
                          htmlFor="name"
                          className="block mb-2 text-sm font-medium"
                        >
                          First Name{" "}
                          <span className="text-red-700 dark:text-black duration-500">
                            *
                          </span>
                        </label>
                        <Field
                          onChange={handleChange}
                          type="text"
                          id="firstName"
                          name="firstName"
                          className="bg-white border outline-none duration-500 border-gray-300 text-gray-900 text-sm rounded-[5px] focus:ring-primary-600 dark:focus:ring-black dark:focus:border-black focus:border-primary-600 block w-full p-2.5 "
                          placeholder="umair"
                          autoComplete="off"
                        />
                        {errors.firstName && touched.firstName ? (
                          <div className="text-red-700 dark:text-black duration-500 text-sm">
                            {errors.firstName}
                          </div>
                        ) : null}
                      </div>
                      <div>
                        <label
                          htmlFor="name"
                          className="block mb-2 text-sm font-medium"
                        >
                          Middle Name(s){" "}
                          <span className="text-red-700 dark:text-black duration-500">
                            *
                          </span>
                        </label>
                        <Field
                          onChange={handleChange}
                          type="text"
                          id="middleName"
                          name="middleName"
                          className="bg-white border outline-none duration-500 border-gray-300 text-gray-900 text-sm rounded-[5px] focus:ring-primary-600 dark:focus:ring-black dark:focus:border-black focus:border-primary-600 block w-full p-2.5 "
                          placeholder="umair"
                          autoComplete="off"
                        />
                        {errors.middleName && touched.middleName ? (
                          <div className="text-red-700 dark:text-black duration-500 text-sm">
                            {errors.middleName}
                          </div>
                        ) : null}
                      </div>
                      <div>
                        <label
                          htmlFor="name"
                          className="block mb-2 text-sm font-medium"
                        >
                          Last Name{" "}
                          <span className="text-red-700 dark:text-black duration-500">
                            *
                          </span>
                        </label>
                        <Field
                          onChange={handleChange}
                          type="text"
                          id="lastName"
                          name="lastName"
                          autoComplete="off"
                          className="bg-white border outline-none duration-500 border-gray-300 text-gray-900 text-sm rounded-[5px] focus:ring-primary-600 dark:focus:ring-black dark:focus:border-black focus:border-primary-600 block w-full p-2.5 "
                          placeholder="umair"
                        />
                        {errors.lastName && touched.lastName ? (
                          <div className="text-red-700 dark:text-black duration-500 text-sm">
                            {errors.lastName}
                          </div>
                        ) : null}
                      </div>
                      <div>
                        <label
                          htmlFor="name"
                          className="block mb-2 text-sm font-medium"
                        >
                          Alias name{" "}
                          <span className="text-red-700 dark:text-black duration-500">
                            *
                          </span>
                        </label>
                        <Field
                          onChange={handleChange}
                          type="text"
                          id="aliasName"
                          name="aliasName"
                          autoComplete="off"
                          className="bg-white border outline-none duration-500 border-gray-300 text-gray-900 text-sm rounded-[5px] focus:ring-primary-600 dark:focus:ring-black dark:focus:border-black focus:border-primary-600 block w-full p-2.5 "
                          placeholder="umair"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="name"
                          className="block mb-2 text-sm font-medium"
                        >
                          Date of Joining{" "}
                          <span className="text-red-700 dark:text-black duration-500">
                            *
                          </span>
                        </label>
                        <div className="relative">
                          <Field name="doj">
                            {({ field, meta, form: { setFieldValue } }) => {
                              return (
                                <DatePicker
                                  format="MMM DD YYYY"
                                  inputClass="w-full text-black rounded-[5px] border outline-none duration-500 border-gray-300 outline-none focus:outline-none dark:focus:ring-black dark:focus:border-black bg-white"
                                  containerClassName="w-full"
                                  className={theme && "bg-dark"}
                                  placeholder={datePlaceHolder}
                                  onChange={(vl) => {
                                    setFieldValue(
                                      "doj",
                                      String(vl.toDate())
                                        .split(" ", 4)
                                        .join(" ")
                                    );
                                  }}
                                />
                              );
                            }}
                          </Field>
                        </div>
                      </div>{" "}
                      <div>
                        <label
                          htmlFor="name"
                          className="block mb-2 text-sm font-medium"
                        >
                          Designation{" "}
                          <span className="text-red-700 dark:text-black duration-500">
                            *
                          </span>
                        </label>
                        <Field
                          onChange={handleChange}
                          type="text"
                          autoComplete="off"
                          id="designation"
                          name="designation"
                          className="bg-white border outline-none duration-500 border-gray-300 text-gray-900 text-sm rounded-[5px] focus:ring-primary-600 dark:focus:ring-black dark:focus:border-black focus:border-primary-600 block w-full p-2.5 "
                          placeholder="Full-Stack Dev"
                        />
                        {errors.designation && touched.designation ? (
                          <div className="text-red-700 dark:text-black duration-500 text-sm">
                            {errors.designation}
                          </div>
                        ) : null}
                      </div>
                      <div>
                        <label
                          htmlFor="default"
                          className="block mb-2 text-sm font-medium"
                        >
                          Employment Type{" "}
                          <span className="text-red-700 dark:text-black duration-500">
                            *
                          </span>
                        </label>
                        <Field
                          as="select"
                          onChange={handleChange}
                          name="empType"
                          id="default"
                          className="bg-white border outline-none duration-500 border-gray-300 text-gray-900  text-sm rounded-[5px] focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-black dark:focus:border-black block w-full p-2.5 "
                        >
                          <option value="Full Time">Full-Time</option>
                          <option value="Part Time">Part-Time</option>
                          <option value="Intern">Intern</option>
                        </Field>
                        {errors.empType && touched.empType ? (
                          <div className="text-red-700 dark:text-black duration-500 text-sm">
                            {errors.empType}
                          </div>
                        ) : null}
                      </div>
                      <div>
                        <label
                          htmlFor="default"
                          className="block mb-2 text-sm font-medium"
                        >
                          Employment Status{" "}
                          <span className="text-red-700 dark:text-black duration-500">
                            *
                          </span>
                        </label>
                        <Field
                          as="select"
                          onChange={handleChange}
                          name="empStatus"
                          id="empStatus"
                          className="bg-white border outline-none duration-500 border-gray-300 text-gray-900  text-sm rounded-[5px] focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-black dark:focus:border-black block w-full p-2.5 "
                        >
                          <option value="Probation">Probation</option>
                          <option value="Permanent">Permanent</option>
                        </Field>
                        {errors.empStatus && touched.empStatus ? (
                          <div className="text-red-700 dark:text-black duration-500 text-sm">
                            {errors.empStatus}
                          </div>
                        ) : null}
                      </div>
                      <div>
                        <label
                          htmlFor="default"
                          className="block mb-2 text-sm font-medium"
                        >
                          Employee Role{" "}
                          <span className="text-red-700 dark:text-black duration-500">
                            *
                          </span>
                        </label>
                        <Field
                          as="select"
                          onChange={handleChange}
                          name="empRoles"
                          id="empRoles"
                          className="bg-white border outline-none duration-500 border-gray-300 text-gray-900 text-sm rounded-[5px] focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-black dark:focus:border-black block w-full p-2.5 "
                        >
                          <option value="Super-Admin">Super Admin</option>
                          <option value="Admin">Admin</option>
                          <option value="Non-Admin">Non-Admin</option>
                        </Field>
                        {errors.empRoles && touched.empRoles ? (
                          <div className="text-red-700 dark:text-black duration-500 text-sm">
                            {errors.empRoles}
                          </div>
                        ) : null}
                      </div>
                      <div>
                        <label
                          htmlFor="department"
                          className="block mb-2 text-sm font-medium"
                        >
                          Department{" "}
                          <span className="text-red-700 dark:text-black duration-500">
                            *
                          </span>
                        </label>

                        <Field
                          as="select"
                          // onChange={(e) => setSelectedDepartments(e.target.value)}
                          name="department"
                          id="department"
                          className="w-full p-2.5 bg-white duration-500 border outline-none border-gray-300 text-gray-900 text-sm rounded-[5px] focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-black dark:focus:border-black block"
                        >
                          {departments.map((option, index) => (
                            <option key={index} value={option}>
                              {option}
                            </option>
                          ))}
                        </Field>
                      </div>
                      <div>
                        <label
                          htmlFor="permissions"
                          className="block mb-2 text-sm font-medium"
                        >
                          Permissions{" "}
                          <span className="text-red-700 dark:text-black duration-500">
                            *
                          </span>
                        </label>
                        <MultiSelect
                          options={permissionOptions}
                          value={permissions}
                          onChange={setPermissions}
                          className="outline-none duration-500 border-gray-300 text-gray-900 text-sm rounded-[5px] focus:ring-blue-500 focus:border-blue-500 block w-full"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="reportingManager"
                          className="block mb-2 text-sm font-medium"
                        >
                          Reporting Manager
                        </label>
                        <MultiSelect
                          options={optionss}
                          value={reportingManager}
                          onChange={setReportingManager}
                          className="bg-white outline-none duration-500 appearance-none border-gray-300 text-gray-900  text-sm rounded-[5px] focus:ring-blue-500 focus:border-blue-500 block w-full"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="seniorReportingManager"
                          className="block mb-2 text-sm font-medium"
                        >
                          Sr. Reporting Manager
                        </label>
                        <MultiSelect
                          options={optionss}
                          value={srreportingManager}
                          onChange={setSrreportingManager}
                          className="bg-white outline-none duration-500 border-gray-300 text-gray-900  text-sm rounded-[5px] focus:ring-blue-500 focus:border-blue-500 block w-full"
                        />
                      </div>
                      <div className="w-full flex flex-row space-x-2 items-center">
                        <Field
                          type="checkbox"
                          // value={values.publicApplicable || false}
                          onChange={handleChange}
                          name="publicHolidays"
                          id="publicHolidays"
                          className="dark:checked:bg-black duration-500 dark:border-black dark:focus:outline-black dark:focus:ring-black"
                        ></Field>
                        <label
                          htmlFor="publicHolidays"
                          className="block text-sm font-medium"
                        >
                          Public holidays applicable
                        </label>
                      </div>
                      <div className="w-full flex flex-row space-x-2 items-center">
                        <Field
                          type="checkbox"
                          // value={values.customApplicable || false}
                          onChange={handleChange}
                          name="customHolidays"
                          id="customHolidays"
                          className="dark:checked:bg-black duration-500 dark:border-black dark:focus:outline-black dark:focus:ring-black"
                        ></Field>
                        <label
                          htmlFor="customHolidays"
                          className="block text-sm font-medium"
                        >
                          Custom holidays applicable
                        </label>
                      </div>
                      <div className="w-full flex flex-row space-x-2 items-center">
                        <Field
                          type="checkbox"
                          // value={values.customApplicable || false}
                          onChange={handleChange}
                          name="cnic"
                          id="cnic"
                          className="dark:checked:bg-black duration-500 dark:border-black dark:focus:outline-black dark:focus:ring-black"
                        ></Field>
                        <label
                          htmlFor="cnic"
                          className="block text-sm font-medium"
                        >
                          CNIC requirement
                        </label>
                      </div>
                    </div>

                    <div className="border-b dark:border-b-black duration-500 mb-4 mx-6"></div>

                    <div className="flex items-center w-full justify-center">
                      {submitLoading ? (
                        <h1 className="flex items-center">
                          {loadingSvg} Loading please wait...
                        </h1>
                      ) : (
                        <button
                          type="submit"
                          className="text-white bg-blue-700 hover:bg-blue-800 dark:bg-black/60 dark:hover:bg-black duration-500 focus:ring-4 text-center focus:outline-none focus:ring-blue-300 font-medium rounded-[5px] text-sm px-4 py-2.5 dark:focus:ring-white items-center w-[200px]"
                        >
                          Submit
                        </button>
                      )}
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        ) : (
          <div className="flex text-lg p-4">
            Oops! No departments found, add Departments first from Settings.
          </div>
        ))}
    </div>
  );
};

export default Register;
