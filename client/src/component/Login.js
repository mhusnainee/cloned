import React from "react";
import { useState } from "react";
import { Formik, Field } from "formik";
import { useNavigate } from "react-router-dom";
import { login_User } from "../auth/authService";
import { loadingSvg, eye } from "../assets/icons";

const Login = ({ setToken }) => {
  const [loading, setloading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  let navigate = useNavigate();

  return (
    <div className="w-full flex items-center justify-center bg-gray-100 dark:bg-sfy h-screen dark:text-white/70 p-2 md:p-8">
      <div className="flex items-center flex-col pb-16 pt-10 px-2 sm:px-6 space-y-16 border border-gray-300 dark:border-white/70 shadow-xl dark:shadow-white/30 rounded-md">
        <div className="text-2xl">Welcome Back!</div>
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={(values) => {
            const errors = {};

            if (!values.password) {
              errors.password = "Required";
            }
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            return errors;
          }}
          onSubmit={async (values) => {
            setloading(true);
            await login_User(values).then((res) => {
              if (res.data.auth) {
                navigate("/");
                setToken(res.data.userData.token);
              }
            });
            setloading(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <label className="block">
                  <span className="block text-sm font-medium ml-0.5">
                    Email
                  </span>
                  <input
                    type="email"
                    name="email"
                    placeholder="example@gmail.com"
                    // autoComplete="off"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    className="w-[270px] mt-1 block px-3 py-2 bg-transparent border border-slate-300 dark:border-white/70 dark:focus:border-black dark:focus:ring-black placeholder-gray-400/50 dark:placeholder-white/40 outline-none rounded-md text-sm duration-500"
                  />
                </label>
                <div className="text-red-600 text-xs mt-1">
                  {errors.email && touched.email}
                </div>
              </div>

              <div className="mb-4">
                <label className="block">
                  <span className="block text-sm font-medium ml-0.5">
                    Password
                  </span>
                  <input
                    type="password"
                    name="password"
                    placeholder="•••••••••••••"
                    // autoComplete="off"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    className="w-[270px] mt-1 block px-3 py-2 bg-transparent border border-slate-300 dark:border-white/70 dark:focus:border-black dark:focus:ring-black placeholder-gray-400/50 dark:placeholder-white/40 outline-none rounded-md text-sm duration-500"
                  />
                  <span
                    // onClick={togglePasswordVisibility}
                    className="absolute right-3 top-3 cursor-pointer"
                  >
                    {true ? (
                      <i className="fas fa-eye-slash">oko</i>
                    ) : (
                      <i className="fas fa-eye">ok</i>
                    )}
                  </span>
                </label>
                <div className="text-red-600 text-xs mt-1 dark:text-black ml-0.5">
                  {errors.password && touched.password && errors.password}
                </div>
              </div>

              <div className="flex justify-around mt-8">
                {!loading && (
                  <button type="button" className="underline">
                    Forgot password?
                  </button>
                )}
                {loading ? (
                  <div className="w-fit h-fit flex flex-row justify-around items-center p-2 text-center">
                    {loadingSvg} Loading please wait...
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 dark:bg-black/60 dark:hover:bg-black duration text-white w-[80px] p-1 rounded-md"
                    disabled={isSubmitting}
                  >
                    Login
                  </button>
                )}
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
