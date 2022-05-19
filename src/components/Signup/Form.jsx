import { Button, FormControlLabel } from "@mui/material";
import React, { useContext, useEffect, useReducer, useRef, useState } from "react";
import { LoginContext } from "../../context/LoginContext";
import classes from "./Signup.module.scss";

const emailReducer = (state, action) => {
  if (action.type === "USER-INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  return state;
};
const passwordReducer = (state, action) => {
  if (action.type === "USER-INPUT") {
    return { value: action.val, isValid: action.val.length >= 6, match: true };
  }
  if (action.type === "PASSWORD-MATCH") {
    return { match: false };
  }
  return state;
};
const nameReducer = (state, action) => {
  if (action.type === "USER-INPUT") {
    return { value: action.val, isValid: action.val.length > 0 };
  }
  return state;
};
const phoneReducer = (state, action) => {
  if (action.type === "USER-INPUT") {
    return { value: action.val, isValid: action.val.length === 10 };
  }
  return state;
};

const Form = () => {

const {setGraph} = useContext(LoginContext)

  const [checkbox, setCheckbox] = useState(null);
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
    match: null,
  });
  const [nameState, dispatchName] = useReducer(nameReducer, {
    value: "",
    isValid: null,
  });
  const [phoneState, dispatchPhone] = useReducer(phoneReducer, {
    value: "",
    isValid: null,
  });

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();
  const nameInputRef = useRef();
  const phoneInputRef = useRef();
  const checkboxRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    const inputPassword = passwordInputRef.current.value;
    const inputConfirmPassword = confirmPasswordInputRef.current.value;
    const inputCheckbox = checkboxRef.current.checked;

    dispatchEmail({ type: "USER-INPUT", val: emailInputRef.current.value });

    dispatchName({ type: "USER-INPUT", val: nameInputRef.current.value });
    dispatchPhone({ type: "USER-INPUT", val: phoneInputRef.current.value });
    if (inputPassword === inputConfirmPassword) {
      dispatchPassword({
        type: "USER-INPUT",
        val: passwordInputRef.current.value,
      });
    } else {
      dispatchPassword({ type: "PASSWORD-MATCH" });
    }
    setCheckbox(inputCheckbox);
  };

  useEffect(() => {
    emailInputRef.current.focus();
  }, []);

  const validEmail = emailState.isValid === false;
  const validName = nameState.isValid === false;
  const validPhone = phoneState.isValid === false;
  const validCheckbox = checkbox === false;
  const validPassword = passwordState.isValid === false;
  const matchPassword = passwordState.match === false;

  const formIsValid =
    emailState.isValid === true &&
    nameState.isValid === true &&
    phoneState.isValid === true &&
    checkbox === true &&
    passwordState.isValid === true &&
    passwordState.match === true;
    
  useEffect(() => {
    if(formIsValid){
      setGraph(true)
      localStorage.setItem('graph',0)
    }
  }, [formIsValid, setGraph]);
    
  return (
    <form>
      <label htmlFor="email" className={classes.label}>
        Your email address
      </label>
      <input
        type="text"
        name="email"
        className={
          validEmail ? `${classes.input} ${classes.invalid}` : classes.input
        }
        ref={emailInputRef}
      />
      {validEmail && (
        <p className={classes.invalidText}>Please enter a valid email id</p>
      )}
      <label htmlFor="password" className={classes.label}>
        Your password
      </label>
      <input
        type="password"
        name="password"
        className={
          validPassword || matchPassword
            ? `${classes.input} ${classes.invalid}`
            : classes.input
        }
        ref={passwordInputRef}
      />
      {validPassword && (
        <p className={classes.invalidText}>Please enter minimum 6 digits</p>
      )}

      {matchPassword && (
        <p className={classes.invalidText}>Password does not match</p>
      )}
      <label htmlFor="password" className={classes.label}>
        Confirm your password
      </label>
      <input
        type="password"
        name="password"
        className={
          validPassword || matchPassword
            ? `${classes.input} ${classes.invalid}`
            : classes.input
        }
        ref={confirmPasswordInputRef}
      />
      <label htmlFor="name" className={classes.label}>
        Your full name
      </label>
      <input
        type="text"
        name="name"
        className={
          validName ? `${classes.input} ${classes.invalid}` : classes.input
        }
        ref={nameInputRef}
      />
      {validName && (
        <p className={classes.invalidText}>Please enter full name</p>
      )}
      <label htmlFor="phone" className={classes.label}>
        Your phone number
      </label>
      <input
        type="tel"
        name="phone"
        className={
          validPhone
            ? `${classes.input} ${classes.invalid} ${classes.inputPhone}`
            : `${classes.input} ${classes.inputPhone}`
        }
        ref={phoneInputRef}
      />
      {validPhone && (
        <p className={classes.invalidText}>
          Please enter 10 digits phone number
        </p>
      )}
      <FormControlLabel
        value="end"
        control={
          <input
            type="checkbox"
            style={{ color: "#008be8 !important" }}
            ref={checkboxRef}
          />
        }
        label="I read and agree Terms and Conditions "
        labelPlacement="end"
        className={classes.TandC}
      />
      {validCheckbox && (
        <p className={classes.invalidText}>Please select checkbox </p>
      )}
      <Button
        variant="contained"
        type="submit"
        className={classes.btn}
        onClick={submitHandler}
      >
        Create account
      </Button>
    </form>
  );
};

export default Form;
