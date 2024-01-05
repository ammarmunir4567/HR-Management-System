import { configureStore } from "@reduxjs/toolkit";
import  useReducer  from "./Slice/authSlice";
import AddEmployeeReducer from './Slice/addEmployeeSlice'
import AddTeamReducer from './Slice/addTeamSlice'

export default configureStore({

    reducer:{
        user:useReducer,
        employee:AddEmployeeReducer,
        team:AddTeamReducer,

    },





});