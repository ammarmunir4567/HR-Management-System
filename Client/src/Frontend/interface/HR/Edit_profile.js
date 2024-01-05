
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Sidebar from "../../Components/Sidebar";
import Menubar from "../../Components/Menubar";
import axios from "axios";
import { useLocation } from "react-router-dom";


const Edit_profile = () => {


    const location = useLocation()
    const person = location.state

    const [name, setName] = useState(person.bar.person.name);
    const [email, setEmail] = useState(person.bar.person.email);
    const [address, setAddress] = useState(person.bar.person.address);
    const [phoneNo, setPhoneNo] = useState(person.bar.person.phoneNo);
    const [role, setRole] = useState(person.bar.person.role);
    const [team, setTeam] = useState(person.bar.person.team);
    const [gender, setGender] = useState(person.bar.person.gender);
    const [doj, setDoj] = useState(person.bar.person.doj);
    const [salary, setSalary] = useState(person.bar.person.salary);
    const [teamList, setTeamList] = useState([]);
    const [roleList, setRoleList] = useState(["Internee", "Software Engineer", "Associate SE"]);
    const [disabled, setDisabled] = useState(false);

    const [teams, setTeams] = useState([]);
    const formattedDoj = new Date(doj).toISOString().split("T")[0];

    useEffect(() => {
        axios.get('http://localhost:3002/Team/')
            .then(response => {
                const teamNames = response.data.map(team => team.teamname);
                setTeamList(teamNames); // Update teamList state with the fetched team names
            })
            .catch(error => console.error('Error fetching teams:', error));
    }, []);
    const onSubmit = async (e) => {
        e.preventDefault();
        // Disable submit button
        setDisabled(true);

        setDisabled(false);
    };
    const handleOnClick = async () => {
        // Create a data object with updated employee information
        const updatedEmployee = {
          email: email,
          address: address,
          name: name,
          phoneNo: phoneNo,
          role: role,
          team: team,
          gender: gender,
          doj: doj,
          salary: salary,
        };
      
        try {
          // Make a PUT request to update the employee
          await axios.put(`http://localhost:3002/Employee/employees/${person.bar.person._id}`, updatedEmployee);
      
          // Handle success, e.g., show a success message, redirect, etc.
          alert('Employee updated successfully');
        } catch (error) {
          // Handle error, e.g., show an error message
          alert('Error updating employee: ' + error.message);
        }
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
                    <Sidebar />
                </aside>

                <div className="flex-grow text-gray-800">
                    <Menubar />
                    <div className="min-h-screen bg-gray-100 flex items-center justify-center ">
                        <div className="w-full max-w-3xl bg-slate-200 shadow-md rounded-lg px-8 py-6">
                            <h3 className="text-3xl font-bold text-purple-500 text-center mb-4">Edit Employee Profile</h3>
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
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
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
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
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
                                        value={phoneNo}
                                        onChange={(e) => setPhoneNo(e.target.value)}
                                        required
                                    />
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
                                        value={salary}
                                        onChange={(e) => setSalary(e.target.value)}
                                        required
                                    />
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
                                        value={role}
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
                                    value={formattedDoj} // Use the formatted date
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

export default Edit_profile;
