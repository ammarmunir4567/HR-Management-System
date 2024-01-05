import React, { useEffect, useState } from 'react';
import Menubar from '../../Components/Menubar';
import Sidebar from '../../Components/Sidebar';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import {
  AlertDialog,
  Button,
  Inset,
  Table,
  TableBody,
  Flex,
} from '@radix-ui/themes';

const View_Employee = () => {
  const location = useLocation();
  const team = location.state.bar;

  const [peopleData, setPeopleData] = useState();
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3002/Employee/')
      .then((response) => {
        const filteredEmployees = response.data.filter(
          (emp) => emp.team === team
        );
        setEmployees(filteredEmployees);
      })
      .catch((error) => console.error('Error fetching employees:', error));
  }, [team]);

  const deleteEmployee = (employeeId) => {
    axios
      .delete(`http://localhost:3002/Employee/employees/${employeeId}`)
      .then(() => {
        console.log('deleted');
      })
      .catch((error) =>
        console.error('Error deleting Employees:', error)
      );
  };


  useEffect(() => {
    // This useEffect will run whenever the 'employees' state changes
    axios
      .get('http://localhost:3002/Employee/')
      .then((response) => {
        const filteredEmployees = response.data.filter(
          (emp) => emp.team === team
        );
        setEmployees(filteredEmployees);
      })
      .catch((error) => console.error('Error fetching employees:', error));
  }, [employees, team]);


  return (
    <>
      <div className="flex bg-gray-100  md:min-h-screen">
        <aside className="hidden sm:flex sm:flex-col">
          <a
            href="#"
            className="inline-flex items-center justify-center h-20 w-60 bg-purple-600 hover:bg-purple-500 focus:bg-purple-500"
          >
            <svg
              fill="none"
              viewBox="0 0 64 64"
              className="h-12 w-12 text-white"
            >
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
          <div className="container mx-auto mt-8">
            <div className="grid  grid-cols-6 md:grid-cols-2 lg:grid-cols-1 gap-8">
              {employees.map((person) => (
                <div
                  key={person.id}
                  className="bg-white rounded-md p-6 shadow-md"
                >
                  <h2 className="text-xl font-bold mb-2">{person.name}</h2>
                  <p className="text-gray-600 mb-2">{person.designation}</p>
                  <p className="text-gray-500 mb-4">{person.team}</p>

                  <div className="flex space-x-4">
                    <Link
                      to="/View_profile"
                      state={{ bar: { person } }}
                      className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                    >
                      View Profile
                    </Link>

                    <Link
                      to="/Edit_profile"
                      state={{ bar: { person } }}
                      className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                    >
                      Edit Profile
                    </Link>

                    <Link
                      to="/Evaluate_profile"
                      state={{ bar: { person } }}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                      Review
                    </Link>

                    <AlertDialog.Root>
                      <AlertDialog.Trigger>
                        <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
                          Delete User
                        </button>
                      </AlertDialog.Trigger>
                      <AlertDialog.Content style={{ maxWidth: 500 }}>
                        <AlertDialog.Title>Delete Users</AlertDialog.Title>
                        <AlertDialog.Description size="2">
                          Are you sure you want to delete this? This action is
                          permanent and cannot be undone.
                        </AlertDialog.Description>
                        <Inset side="x" my="5">
                          <Table.Root>
                            <Table.Header>
                              <Table.Row>
                                <Table.ColumnHeaderCell>
                                  Full name
                                </Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>Team</Table.ColumnHeaderCell>
                              </Table.Row>
                            </Table.Header>

                            <TableBody>
                              <Table.Row>
                                <Table.RowHeaderCell>{person.name}</Table.RowHeaderCell>
                                <Table.Cell>{person.email}</Table.Cell>
                                <Table.Cell>{person.team}</Table.Cell>
                              </Table.Row>
                            </TableBody>
                          </Table.Root>
                        </Inset>

                        <Flex gap="3" justify="end">
                          <AlertDialog.Cancel>
                            <Button variant="soft" color="gray">
                              Cancel
                            </Button>
                          </AlertDialog.Cancel>
                          <AlertDialog.Action>
                            <Button
                              onClick={() => {
                                deleteEmployee(person._id);
                              }}
                              variant="danger"
                            >
                              Delete
                            </Button>
                          </AlertDialog.Action>
                        </Flex>
                      </AlertDialog.Content>
                    </AlertDialog.Root>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default View_Employee;
