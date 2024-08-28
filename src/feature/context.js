import { createContext } from "react";

export const TodoContext = createContext();
export const intialState = {
     data:[]
}
export const reducerTodoFunction = (state,action) => {
     return{
        [action.type] : action.payload
     }
}