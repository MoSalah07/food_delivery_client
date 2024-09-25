/* eslint-disable react/prop-types */
import { useState, forwardRef, Fragment, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import {
  URL_API,
  TOKEN_DELIVERY,
  DETAILS_DELIVERY_FOOD,
} from "../../constant/Contant";
import axios from "axios";
import { toast } from "react-toastify";
import { StoreCTX } from "../../context/StoreProvider";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FromAuth({ open, setOpen }) {
  const [actionFrom, setActionFrom] = useState("login");
  const [dataInputs, setDataInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { isDisabled, setIsDisabled, setToken, setRole } = StoreCTX();

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  function validatePassword(password) {
    return password.length >= 8;
  }

  function validateUsername(name) {
    return name.length >= 3;
  }

  const handleClose = () => {
    setOpen(false);
  };

  const getValuesFromInputs = (e) => {
    setDataInputs({ ...dataInputs, [e.target.name]: e.target.value });
    validateInputs(e.target.name, e.target.value);
  };

  const validateInputs = (name, value) => {
    let errorMsg = "";
    if (name === "name") {
      if (!validateUsername(value)) {
        errorMsg = "Username must be at least 3 characters long.";
      }
    } else if (name === "email") {
      if (!validateEmail(value)) {
        errorMsg = "Invalid email address.";
      }
    } else if (name === "password") {
      if (!validatePassword(value)) {
        errorMsg = "Password must be at least 8 characters long.";
      }
    }

    setErrors({
      ...errors,
      [name]: errorMsg,
    });
  };

  // Login
  const handleSubmitFormLogin = async (e) => {
    e.preventDefault();
    try {
      const { data: dataLogin } = await axios.post(
        `${URL_API}/auth/login`,
        dataInputs
      );
      if (dataLogin.success) {
        toast.success(`${dataLogin.data.message}`);
        localStorage.setItem(
          TOKEN_DELIVERY,
          JSON.stringify(dataLogin.data.token)
        );
        localStorage.setItem(
          DETAILS_DELIVERY_FOOD,
          JSON.stringify(dataLogin.data.data.role)
        );
        setToken(dataLogin.data.token);
        setRole(dataLogin.data.data.role);
        setIsDisabled(false);
        setDataInputs({ name: "", email: "", password: "" });
        setOpen(false);
      } else {
        setIsDisabled(true);
        toast.error(`something went wrong`);
      }
      return dataLogin;
    } catch (err) {
      setIsDisabled(true);
      console.log(err.message);
      toast.error(err && err.response && err.response.data.message);
      return err;
    } finally {
      setIsDisabled(false);
    }
  };

  // Register
  const handleSubmitFormRegister = async (e) => {
    e.preventDefault();
    setIsDisabled(true);
    try {
      const { data } = await axios.post(`${URL_API}/auth/register`, dataInputs);
      if (data.success) {
        toast.success(`${dataInputs.email} successfully registered}`);
        localStorage.setItem(TOKEN_DELIVERY, JSON.stringify(data.data.token));
        localStorage.setItem(
          DETAILS_DELIVERY_FOOD,
          JSON.stringify(data.data.role)
        );
        setToken(data.data.token);
        setRole(data.data.role);
        setIsDisabled(false);
        setDataInputs({ name: "", email: "", password: "" });
        setOpen(false);
      } else {
        setIsDisabled(true);
        toast.error(`something went wrong`);
      }
    } catch (err) {
      setIsDisabled(true);
      console.log(err.message);
      toast.error(err && err.response && err.response.data.message);
      return err;
    } finally {
      setIsDisabled(false);
    }
  };

  // Reset Form Values inputs and Errors Validation
  useEffect(() => {
    setDataInputs({ name: "", email: "", password: "" });
    setErrors({ name: "", email: "", password: "" });
  }, [actionFrom]);

  return (
    <Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <form
          onSubmit={
            actionFrom === "login"
              ? handleSubmitFormLogin
              : handleSubmitFormRegister
          }
          className={`w-full md:w-[400px] ${
            actionFrom === "login" ? "min-h-[45vh]" : "auto"
          } py-6 px-8`}
        >
          <div className="flex items-center justify-between">
            <h3 className="mb-5 capitalize text-xl font-medium">
              {actionFrom === "register" ? "sign up" : "login"}
            </h3>
            <IconButton
              onClick={() => setOpen(false)}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1rem",
              }}
            >
              <CloseIcon />
            </IconButton>
          </div>
          <div className="flex flex-col">
            {actionFrom === "register" && (
              <>
                <input
                  name="name"
                  onChange={getValuesFromInputs}
                  value={dataInputs.name}
                  className={`border p-2 outline-orange-500 ${
                    errors.name === "border-orange-500"
                  }`}
                  type="text"
                  // required
                  placeholder="Your name"
                />
                {errors.name && <p className="text-red-500">{errors.name}</p>}
              </>
            )}
            <input
              className={`border p-2 outline-orange-500 ${
                errors.email === "border-orange-500"
              }`}
              type="email"
              // required
              placeholder="Your email"
              name="email"
              onChange={getValuesFromInputs}
              value={dataInputs.email}
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
            <input
              className={`border p-2 outline-orange-500 ${
                errors.password === "border-orange-500"
              }`}
              type="password"
              // required
              placeholder="Your password"
              name="password"
              onChange={getValuesFromInputs}
              value={dataInputs.password}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password}</p>
            )}
          </div>
          <Button
            type="submit"
            disabled={
              errors.password ||
              errors.email ||
              errors.name ||
              !dataInputs.email ||
              !dataInputs.password ||
              isDisabled
                ? true
                : false
            }
            sx={{
              marginTop: "16px",
              display: "block",
              width: "100%",
              background: "#d67229",
              color: "white",
            }}
          >
            {actionFrom === "register" ? "Create Account" : "Login"}
          </Button>
          <div className="mt-4">
            <label htmlFor="check">
              <input type="checkbox" required id="check" />
              <span className="ml-2">
                by continuing, i agree to the terms of use & privacy policy
              </span>
            </label>
          </div>
          <div className="mt-4">
            <span>
              {actionFrom === "register"
                ? "already have an account ?"
                : "Create a new account ?"}
            </span>
            {actionFrom === "register" ? (
              <span
                onClick={() => setActionFrom("login")}
                className="text-orange-700 cursor-pointer hover:underline ml-1"
              >
                login here
              </span>
            ) : (
              <span
                onClick={() => setActionFrom("register")}
                className="text-orange-700 cursor-pointer hover:underline ml-1"
              >
                Click Here
              </span>
            )}
          </div>
        </form>
      </Dialog>
    </Fragment>
  );
}
