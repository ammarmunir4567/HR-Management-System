import { createSlice } from "@reduxjs/toolkit";

// Define the initial state outside of the createSlice call
const initialState = {
  employee: {
    email: '',
    name: '',
    address: '',
    phoneNo: '',
    role: 'Select Role',
    team: 'Select Team',
    gender: 'Select Gender',
    doj: '',
    salary: '',
  },
  teamList: [],
  roleList: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null
};

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    setEmployee: (state, action) => {
      state.employee = action.payload;
    },
    resetEmployee: state => {
      // Reset employee to its initial state directly
      state.employee = {
        email: '',
        name: '',
        address: '',
        phoneNo: '',
        role: 'Select Role',
        team: 'Select Team',
        gender: 'Select Gender',
        doj: '',
        salary: '',
      };
    }
  }
});

export const { setEmployee, resetEmployee } = employeeSlice.actions;

export default employeeSlice.reducer;
