import { createSlice } from "@reduxjs/toolkit";

// Define the initial state outside of the createSlice call
const initialState = {
  Team: {
    team: '',
    description:'',
  },
  
};

const AddTeamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    setTeam: (state, action) => {
      state.team = action.payload;
    },
    
  }
});

export const { setTeam} = AddTeamSlice.actions;

export const selectTeam=(state)=>state.Team.Team;

export default AddTeamSlice.reducer;
