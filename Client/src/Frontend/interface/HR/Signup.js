import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../Assets/logo.png";
import axios from 'axios';
import { Navigate } from "react-router-dom";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [rePasswordError, setRePasswordError] = useState("");

  function validateForm() {
    let isValid = true;

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!username || !emailRegex.test(username)) {
      setUsernameError("Please enter a valid email address");
      isValid = false;
    } else {
      setUsernameError("");
    }

    // Password validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(.{7,})$/;
    if (!password || !passwordRegex.test(password)) {
      setPasswordError("Password must contain at least one uppercase letter, one special character, and be at least 7 characters long");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (password !== rePassword) {
      setRePasswordError("Passwords do not match");
      isValid = false;
    } else {
      setRePasswordError("");
    }

    return isValid;
  }

  function handleSignup() {
    if (validateForm()) {
      const data = {
        username: username,
        password: password,
      };

      console.log(data);
      axios.post('http://localhost:3002/User/add', data)
        .then(res => {
          console.log(res.data);
          alert('User added successfully!');
          

        })
        .catch(error => {
          console.error('Error:', error);
          alert('An error occurred while adding login.');
        });
    }
  }

  return (
    <>
      <section className="bg-gray-50 light:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 light:text-white"
          >
            <img className="w-8 h-8 mr-2" src={Logo} alt="logo" />
            TalentTrac
          </a>
          <div className="w-full bg-white rounded-lg shadow light:border md:mt-0 sm:max-w-md xl:p-0 light:bg-gray-800 light:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl light:text-white">
                Create an account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 light:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
                    placeholder="name@company.com"
                    required=""
                  />
                  <span className="text-red-500">{usernameError}</span>
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 light:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
                    required=""
                  />
                  <span className="text-red-500">{passwordError}</span>
                </div>
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block mb-2 text-sm font-medium text-gray-900 light:text-white"
                  >
                    Confirm password
                  </label>
                  <input
                    type="confirm-password"
                    name="confirm-password"
                    onChange={(e) => {
                      setRePassword(e.target.value);
                    }}
                    value={rePassword}
                    id="confirm-password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
                    required=""
                  />
                  <span className="text-red-500">{rePasswordError}</span>
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 light:bg-gray-700 light:border-gray-600 light:focus:ring-primary-600 light:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="terms"
                      className="font-light text-gray-500 light:text-gray-300"
                    >
                      I accept the{" "}
                      <a
                        className="font-medium text-primary-600 hover:underline light:text-primary-500"
                        href="#"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div>
                <button
                  onClick={handleSignup}
                  type="button"
                  className="w-full text-white rounded-md"
                  style={{ backgroundColor: "#318CE7" }}
                  
                >
              
                  Create an account
                </button>
                <p className="text-sm font-light text-gray-500 light:text-gray-400">
                  Already have an account?{" "}
                  <Link
                    to="/Login"
                    className="font-medium text-primary-600 hover:underline light:text-primary-500"
                  >
                    Login here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
