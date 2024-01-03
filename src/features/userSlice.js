import { createSlice } from '@reduxjs/toolkit';

const initialState={
    userName:null,
    userEmail:null,
    userId:null
};

 const userSlice= createSlice({
    name : 'user',
    initialState,
    reducers:{
        setUserActiveStatus:(state, action)=>{
            state.userName = action.payload.userName
            state.userEmail= action.payload.userEmail
            state.userId= action.payload.userId
        },
        setUserLogoutStatus:(state, action)=>{
            state.userName = null
            state.userEmail= null
            state.userId=null
        }
    }
})

export const {setUserActiveStatus, setUserLogoutStatus}=userSlice.actions;

export const selectUserName = state => state.user.userName;
export const selectUserEmail = state => state.user.userEmail;
export const selectUserId = state=>state.user.userId;


export default userSlice.reducer;
