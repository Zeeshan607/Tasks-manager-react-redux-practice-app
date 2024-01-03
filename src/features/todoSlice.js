import { createSlice} from '@reduxjs/toolkit'

const initialState = {
    todos:[],
    status:'idle'//idle, success, failed , loading, 
}

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
       setTodos:(state, action)=>{
            state.todos=action.payload.todos
        },
        addTodo:(state, action)=>{
            state.todos.push(action.payload.todo)
        },
        updateTodo:(state,action)=>{
            // state.todos.forEach(td=>{
            //     if(td.id==action.payload.id){

            //     }
            // })\
            console.log('todos not updated but function called')
        },
        deleteTodo:(state,action)=>{
            const updatedTodos=state.todos.filter(t=> t.id !== action.payload.id)
            state.todos=updatedTodos;
        },
        getTodoById:(state, action)=>{
            const todo=state.todos.find(t=>t.id = action.payload.id)
            return {payload:todo}
        }
  }
});

export const {setTodos, addTodo, updateTodo, deleteTodo} = todoSlice.actions;
export const selectTodos = (state) => state.todo.todos;
export default todoSlice.reducer