import { createSlice } from '@reduxjs/toolkit'

const initialState = {
        errors:[],
        messages:[]
}

const ResponseSlice = createSlice({
  name: 'response',
  initialState,
  reducers: {
    setResponse:(state, action)=>{
        if(action.payload.type==="error"){
            state.errors.push(action.payload.message)
        }
        if(action.payload.type==='message'){
          state.messages.push(action.payload.message)
        }
        
    },
    resetResponse:(state, action)=>{
        state.errors=[];
        state.messages=[];
    }

  }
});

export const {setResponse, resetResponse} = ResponseSlice.actions

export const resetResponseAfterInteval=(dispatch)=>{
              setInterval(function(){
                  dispatch(resetResponse())
              },50000)
            }

export const selectErrors= state => state.response.errors
export const selectMessages= state =>state.response.messages
export default ResponseSlice.reducer