import React from "react";
import Card from "../UI/Card";
import Form from "./Form";
import classes from "./Signup.module.scss";
import bg from "../../assest/bg.png";

const Signup = () => {
  return (
    <Card>
      <div className={classes.signup}>
        <div className={classes.signupPic}>
          <div className={classes.signupPicDetails}>
            <img src={bg} alt="Bar Graph" className={classes.imgBg} />
            <div className={classes.picDetails}>
              <h3>Choose a date range</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.Ducimus
                quia ratione.
              </p>
            </div>
          </div>
        </div>
        <div className={classes.signupAccount}>
          <img className={classes.signupAccountBg} src={bg} alt="" />
          <div className={classes.signupAccountBody}>
            <h2 className={classes.heading}>Create an account</h2>
            <Form />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Signup;
