import React from "react";
import { useForm } from "react-hook-form";
import '../App.css'
import NewNavbar from '../Components/NewNavbar'
import { Link } from "react-router-dom";
// Functional component for the registration form   
export default function Form() {
  const [registrationSuccessful, setRegistrationSuccessful] = React.useState(
    false
  );
  // Destructuring properties from react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
  } = useForm({
    mode: "all", // Validation mode to check all fields on submit
  });

  const onSubmit = (data) => {
    if (
      data.name.length >= 3 &&
      data.name.length <= 30 &&
      data.email.includes("@") &&
      data.password.length >= 10 &&
      /[!@#$%^&*(),.?":{}|<>]/.test(data.password) &&
      data.password === data.repeatPassword
    ) 
    {
      // If validation passes, set registrationSuccessful to true
      setRegistrationSuccessful(true);
      console.log("Data", data);
    }
  };

  const validatePasswordMatch = (value) => {
    const { password } = getValues();
    // Function to validate password match
    return value === password || "Passwords do not match";
  };

  return (
    <div className="registrationForm">
      {registrationSuccessful && (
        <div className="done">
          <p>Registration Successful !</p>
        </div>
      )}
      <div className="form">
        <div className="nav">
          <NewNavbar />
        </div>
        {/* Form element with onSubmit handler */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="inputData">
            <label>Name :</label>
            <input
              type="text"
              placeholder="Enter Your Name"
              name="name"
              //spread operator 
              {...register("name", {
                required: "Name is Required !",
                minLength: {
                  value: 3,
                  message: "Name should be at least 3 characters long",
                },
                maxLength: {
                  value: 30,
                  message: "Name should not exceed 30 characters",
                },
              })}
            />
            {errors.name && (
              <p className="errorMessage">{errors.name.message}</p>
            )}
          </div>
          <div className="inputData">
            <label>Email :</label>
            <input
              type="text"
              placeholder="Enter Your Email"
              name="email"
              {...register("email", {
                required: "Email is Required !",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid Email",
                },
              })}
            />
            {errors.email && (  
              <p className="errorMessage">{errors.email.message}</p>
            )}
          </div>
          <div className="inputData">
            <label>Password :</label>
            <input
              type="password"
              placeholder="Enter Your Password"
              name="password"
              {...register("password", {
                required: "Password is Required !",
                minLength: {
                  value: 10,
                  message: "Password must be more than 10 characters",
                },
                pattern: {
                  value: /[!@#$%^&*(),.?":{}|<>]/,
                  message: "Password must contain at least one special character",
                },
              })}
            />
              {/* Display error message if validation fails */}
            {errors.password && (
              <p className="errorMessage">{errors.password.message}</p>
            )}
          </div>
          <div className="inputData">
            <label>Repeat Password :</label>
            <input
              type="password"
              placeholder="Re-Enter Your Password"
              name="repeatPassword"
              {...register("repeatPassword", {
                required: "Repeat Password is required !",
                validate: validatePasswordMatch,
              })}
            />
            {errors.repeatPassword && (
                // Display error message if validation fails
              <p className="errorMessage">{errors.repeatPassword.message}</p>
            )}
          </div>
          {/* Submit button */}
          
          <input
            type="submit"
            value="Sign up"
            className="btn"
            disabled={!isValid}  // Disabled the submit button if the form is not valid
          />
        </form>
      </div>
    </div>
  );
}
