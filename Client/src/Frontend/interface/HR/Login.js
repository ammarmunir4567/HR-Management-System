import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../Assets/logo.png'
import { useDispatch } from 'react-redux';
import { login } from '../../Redux/Slice/authSlice';
import axios from 'axios';


const apiUrl = 'http://localhost:3002/User';

export default function Login() {
  const history = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [employeeName,setEmployeeName]=useState("");
  
  let employeeName;
  let employeeRole;
  let employeeId;
  const handleusernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePassChange = (e) => {
    setPassword(e.target.value);
  };

  const handleOnClick = (e) => {
    const data = {
      username: username,
      password: password,
    };
  
    let employeeName=" ";
    axios.post(`${apiUrl}/login`, data)
      .then(async (res) => {
        console.log(res.data);
        alert('Login successfully');
  
        // Fetch employee data
        const employeeDataResponse = await axios.get("http://localhost:3002/Employee/");
        const employeeData = employeeDataResponse.data;
        const isEmployee = employeeData.some((employee) => {if(employee.email === username){
            employeeName=employee.name
            employeeRole=employee.role
            employeeId=employee._id
            return true;
        }
        else{
          return false
        }
        });
       
       console.log(isEmployee);
      
  
        if (isEmployee===true) {
          history('/E_Dashboard',{ state: { username } });
          // Redirect to employee dashboard
          dispatch(login({
            username: username,
            name:employeeName,
            role:employeeRole,
            id:employeeId,
            password: password,
            isLoggedIn: true,
  
          }));
          

        } else if(isEmployee===false){
          history('/Dashboard',{ state: { username}});
          dispatch(login({
            username: username,
            password: password,
            isLoggedIn: true,
  
          }));
          
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred while logging in.');
      });
  };

  

  return (
    <>
    <section className="bg-gray-50 light:bg-gray-900">
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 light:text-white">
            <img className="w-8 h-8 mr-2" src={Logo} alt="logo"/>
            TalentTrac 
        </a>
        <div className="w-full bg-white rounded-lg shadow light:border md:mt-0 sm:max-w-md xl:p-0 light:bg-gray-800 light:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl light:text-white">
                    Sign in to your account
                </h1>
                <form className="space-y-4 md:space-y-6" action="#">
                    <div>
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 light:text-white">Your username</label>
                        <input type="username" name="username" id="username" value={username} onChange={handleusernameChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500" placeholder="name@company.com" required=""/>
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 light:text-white">Password</label>
                        <input type="password" name="password" id="password" value={password} onChange={handlePassChange} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500" required=""/>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 light:bg-gray-700 light:border-gray-600 light:focus:ring-primary-600 light:ring-offset-gray-800" required=""/>
                            </div>
                            <div className="ml-3 text-sm">
                              <label htmlFor="remember" className="text-gray-500 light:text-gray-300">Remember me</label>
                            </div>
                        </div>
                        <a href="#" className="text-sm font-medium text-primary-600 hover:underline light:text-primary-500">Forgot password?</a>
                    </div>
                    <Link type="submit" className="w-full text-center rounded-md  text-white  bg-blue " onClick={handleOnClick} style={{backgroundColor:"#318CE7"}}>Sign in</Link>
               
                    <div className="text-sm font-light text-gray-500 light:text-gray-400">
                        
                         <Link to="/Signup" className="font-medium text-primary-600 hover:underline light:text-primary-500"> Haven't register? Click here</Link>
                    </div>
               
                    
                </form>
            </div>
        </div>
    </div>
  </section>
    </>
  )
}
