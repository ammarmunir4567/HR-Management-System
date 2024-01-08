import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setEmployee } from "../../Redux/Slice/addEmployeeSlice";
import Sidebar from "../../Components/Sidebar";
import Menubar from "../../Components/Menubar";
import axios from "axios";
import { Callout } from "@radix-ui/themes";

const AddEmployee = () => {
  const dispatch = useDispatch();
  const [errorCallout, setErrorCallout] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [role, setRole] = useState("");
  const [team, setTeam] = useState("");
  const [gender, setGender] = useState("");
  const [doj, setDoj] = useState("");
  const [salary, setSalary] = useState("");
  const [teamList, setTeamList] = useState([]);
  const [roleList, setRoleList] = useState(["Internee", "Software Engineer", "Associate SE"]);
  const [disabled, setDisabled] = useState(false);

  const [nameError, setNameError] = useState('');
  const [numberError, setNumberError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [SalaryError, setSalaryError] = useState('');

  const [teams, setTeams] = useState([]);

  function SalaryCheck(amount){
    if(amount<0){
      setSalaryError("Salary can not be of negative")
    }
    else{
      setSalaryError("")
    }
  }

  function containsNumber(inputString) {
    if (inputString == "") {
      setNameError('name is required*');
    } else {
      setNameError('');
      if (inputString.length >= 3) {
        for (let i = 0; i < inputString.length; i++) {
          if (!isNaN(inputString[i]) && inputString[i] !== " ") {
            setNameError('use alphabets only*');
            return 0;
          }
        }
        return 1;
      } else {
        setNameError('name must be greater then length 3*');
        return 0;
      }
    }
  }

  const validatePhoneNumber = (phone) => {

    if (phoneNo==""){
      setNumberError("Phone number is required*")
    }
    else if(phone.length!=11){
      setNumberError("Phone number should be of 11 digits")
    }
    else{
      setNumberError("")
    }
  };

  function validateEmail(email) {
    if (email == "") {
      setEmailError("email is required*");
    } else {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      const x = emailPattern.test(email);

      if (x == false) {
        setEmailError("Email syntax is not correct.*");
        return 0;
      } else {
        setEmailError("");
        return 1;
      }
    }
  }
  

  useEffect(() => {
    axios.get('http://localhost:3002/Team/')
      .then(response => {
        const teamNames = response.data.map(team => team.teamname);
        setTeamList(teamNames); // Update teamList state with the fetched team names
      })
      .catch(error => console.error('Error fetching teams:', error));
  }, []);// Empty dependency array ensures this effect runs once when the component mounts

  const onSubmit = async (e) => {
    e.preventDefault();
    // Disable submit button
    setDisabled(true);

    // Your submit logic here...

    // Enable submit button after processing
    setDisabled(false);
  };

  const handleOnClick = () => {

    const data={
      email: email,
      address: address,
      name: name,
      phoneNo: phoneNo,
      role: role,
      team: team,
      gender: gender,
      doj: doj,
      salary: salary,

    }

    axios.post("http://localhost:3002/Employee/add", data)
    .then(res => {
      console.log(res.data);
      setErrorCallout(
        <Callout.Root color="green">
          <Callout.Text>
            Employee Added successfully
          </Callout.Text>
        </Callout.Root>
      );
      setTimeout(() => {
        setErrorCallout(null);
      }, 1000);
    })
    .catch(error => {
      // Check if the error response has a message and use it
      const errorMessage = error.response && error.response.data && error.response.data.message
                            ? error.response.data.message
                            : "An error occurred";
  
      setErrorCallout(
        <Callout.Root color="red">
          <Callout.Text>
            {errorMessage}
          </Callout.Text>
        </Callout.Root>
      );
  
      setTimeout(() => {
        setErrorCallout(null);
      }, 1000);
    });
  

    dispatch(
      setEmployee({
        email: email,
        address: address,
        name: name,
        phoneNo: phoneNo,
        role: role,
        team: team,
        gender: gender,
        doj: doj,
        salary: salary,
      })
    );
  };

  
  return (
    <>
   
    <body className="flex bg-gray-100 min-h-screen">
      <aside className="hidden sm:flex sm:flex-col">
        <a
          href="#"
          className="inline-flex items-center justify-center h-20 w-60 bg-purple-600 hover:bg-purple-500 focus:bg-purple-500"
        >
          <svg fill="none" viewBox="0 0 64 64" className="h-12 w-12">
            <title>Company logo</title>
            <path
              d="M32 14.2c-8 0-12.9 4-14.9 11.9 3-4 6.4-5.6 10.4-4.5 2.3.6 4 2.3 5.7 4 2.9 3 6.3 6.4 13.7 6.4 7.9 0 12.9-4 14.8-11.9-3 4-6.4 5.5-10.3 4.4-2.3-.5-4-2.2-5.7-4-3-3-6.3-6.3-13.7-6.3zM17.1 32C9.2 32 4.2 36 2.3 43.9c3-4 6.4-5.5 10.3-4.4 2.3.5 4 2.2 5.7 4 3 3 6.3 6.3 13.7 6.3 8 0 12.9-4 14.9-11.9-3 4-6.4 5.6-10.4 4.5-2.3-.6-4-2.3-5.7-4-2.9-3-6.3-6.4-13.7-6.4z"
              fill="#fff"
            />
          </svg>
        </a>
        <Sidebar/>
      </aside>

      <div className="flex-grow text-gray-800">
      {errorCallout}
        <Menubar/>
    <div className="min-h-screen bg-gray-100 flex items-center justify-center ">
      <div className="w-full max-w-3xl bg-slate-200 shadow-md rounded-lg px-8 py-6">
        <h3 className="text-3xl font-bold text-purple-500 text-center mb-4">Add Employee</h3>
        <hr className="my-4" />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="input-field rounded-md"
              id="name"
              
              type="text"
              name="name"
              value={name}
              onChange={(e) => {setName(e.target.value)
                containsNumber(e.target.value);
              }}
              required
            />
            <span  className="error-message  ml-2" id="name-error" style={{ textAlign: 'center',color:"red" }} value={nameError}  >{nameError}</span>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="input-field rounded-md"
              id="email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                validateEmail(e.target.value);
              }}
              required
            />
            <span className="error-message ml-2" id="email-error" style={{ textAlign: 'center' ,color:"red"}} value={emailError} >{emailError}</span>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
            Address
          </label>
          <textarea
            className="input-field rounded-md"
            id="address"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2 " htmlFor="phoneNo">
              Phone No.
            </label>
            <input
              className="input-field rounded-md"
              id="phoneNo"
              type="number"
              name="phoneNo"
              min="0"
              value={phoneNo}
              onChange={(e) => {setPhoneNo(e.target.value) ,validatePhoneNumber(e.target.value)}}
              required="required"
            />
  <span className="error-message ml-2" id="no-error" style={{ textAlign: 'center', color:"red" }} value={numberError}>{numberError}</span>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="salary">
              Salary
            </label>
            <input
              className="input-field rounded-md"
              id="salary"
              type="number"
              name="salary"
              min="0"
              value={salary}
              onChange={(e) => {setSalary(e.target.value), SalaryCheck(e.target.value);}}
              required
            />
              <span className="error-message ml-2" id="no-error" style={{ textAlign: 'center', color:"red" }} value={SalaryError}>{SalaryError}</span>
          </div>

        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="team">
              Team
            </label>
            <select
              className="input-field rounded-md"
              id="team"
              name="team"
              value={team}
              onChange={(e) => setTeam(e.target.value)}
            >
              <option value="Select Team">Select Team</option>
              {teamList.map((teamName, index) => (
            <option key={index} value={teamName}>
              {teamName}
            </option>
          ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
              Role
            </label>
            <select
              className="input-field rounded-md"
              id="role"
              name="role"
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="Select Role">Select Role</option>
              {roleList.map((roleName) => (
                <option key={roleName} value={roleName}>
                  {roleName}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="doj">
            Date Of Joining
          </label>
          <input
            className="input-field rounded-md"
            id="doj"
            type="date"
            name="doj"
            value={doj}
            onChange={(e) => setDoj(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Gender</label>
          <div className="input-field rounded-md">
            <label className="mr-4 cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={gender === "Male"}
                onChange={(e) => setGender(e.target.value)}
              />{" "}
              Male
            </label>
            <label className="cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={gender === "Female"}
                onChange={(e) => setGender(e.target.value)}
              />{" "}
              Female
            </label>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <button
            className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            onClick={handleOnClick}
            disabled={disabled}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
    </div>
      </body>
    </>
  );
};

export default AddEmployee;
