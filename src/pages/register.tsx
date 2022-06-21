import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import { ROUTES } from "../../share";
import BehindBanner from "@components/BehindBanner/BehindBanner";

const Register = () => {
  const [showPass, setShowPass] = useState(true);
  const [showCfPass, setShowCfPass] = useState(true);
  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: (values, actions) => {
      console.log(values);
      actions.resetForm();
    },
    validationSchema: Yup.object({
      userName: Yup.string().required("Vui lòng điền vào trường này"),
      email: Yup.string()
        .email("Vui lòng nhập định dạng email hợp lệ")
        .required("Vui lòng điền vào trường này"),
      password: Yup.string()
        .required("Vui lòng điền vào trường này")
        .min(6, "Mật khẩu quá ngắn - vui lòng nhập trên 6 kí tự"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Mật khẩu bạn nhập không khớp")
        .required("Vui lòng điền vào trường này"),
    }),
  });

  return (
    <>
      <Head>
        <title>Register</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative min-h-screen bg-zinc-200 flex flex-col justify-center px-6 lg:px-8">
        <BehindBanner />
        <div className="z-10">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <Link href={ROUTES.HOME}>
              <img
                src="images/lg-devmart.png"
                alt=""
                className="cursor-pointer hidden md:flex mx-auto h-20 w-auto"
              />
            </Link>
            <Link href={ROUTES.HOME}>
              <img
                src="images/mini-lg.png"
                alt=""
                className="cursor-pointer w-auto flex md:hidden mx-auto h-10"
              />
            </Link>
            <h2 className="mt-6 text-center text-lg font-thin text-green-500">
              Tạo tài khoản để trải nghiệm đầy đủ tính năng
            </h2>
          </div>
          <div className="mt-8 mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
              <form
                onSubmit={formik.handleSubmit}
                className="flex flex-col mt-10 w-full"
              >
                <label htmlFor="name" className="mb-2">
                  Tên đăng nhập *
                </label>
                <OutlinedInput
                  type="text"
                  id="name"
                  className="rounded-md"
                  {...formik.getFieldProps("userName")}
                />
                {formik.touched.userName && formik.errors.userName && (
                  <span className="text-sm m-2 text-red-600">
                    {formik.errors.userName}
                  </span>
                )}
                <label htmlFor="email" className="m-2">
                  Email *
                </label>
                <OutlinedInput
                  type="text"
                  id="email"
                  className="rounded-md"
                  {...formik.getFieldProps("email")}
                />
                {formik.touched.email && formik.errors.email && (
                  <span className="text-sm m-2 text-red-600">
                    {formik.errors.email}
                  </span>
                )}
                <label htmlFor="password" className="m-2">
                  Mật khẩu
                </label>
                <OutlinedInput
                  type={showPass ? "password" : "text"}
                  id="password"
                  className="rounded-md"
                  {...formik.getFieldProps("password")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        edge="end"
                        onClick={() => setShowPass(!showPass)}
                      >
                        {showPass ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {formik.touched.password && formik.errors.password && (
                  <span className="text-sm m-2 text-red-600">
                    {formik.errors.password}
                  </span>
                )}
                <label htmlFor="Cfpassword" className="m-2">
                  Xác nhận mật khẩu
                </label>
                <OutlinedInput
                  type={showCfPass ? "password" : "text"}
                  id="Cfpassword"
                  className="rounded-md"
                  {...formik.getFieldProps("confirmPassword")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        edge="end"
                        onClick={() => setShowCfPass(!showCfPass)}
                      >
                        {showCfPass ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword && (
                    <span className="text-sm m-2 text-red-600">
                      {formik.errors.confirmPassword}
                    </span>
                  )}
                <button
                  className={`${
                    formik.isValid ? "bg-blue-500" : "cursor-not-allowed"
                  } bg-blue-400 mt-6 rounded-sm p-2 text-white cursor-pointer`}
                  disabled={!formik.isValid}
                  type="submit"
                >
                  <span>Đăng kí</span>
                </button>
              </form>
            </div>
            <div className="flex flex-col items-center">
              <span className="m-10">
                Already have an account ?
                <Link href={ROUTES.LOGIN}>
                  <span className="text-blue-800 font-bold cursor-pointer border-b-2 border-blue-800">
                    Signin
                  </span>
                </Link>
              </span>
              <span className="text-sm opacity-60 mb-10">
                © 2022 e-Commerce. Design with 🧡 by e-Commerce Team.
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
