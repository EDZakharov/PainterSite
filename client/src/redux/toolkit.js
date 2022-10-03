import { createSlice, configureStore } from '@reduxjs/toolkit'

const counterSlice = createSlice({
    name: 'lol',
    initialState: {
        value: 0,
        todo:[]
    },
    reducers: {
        incremented: (state) => {
            state.value += 1
        },
        decremented: (state) => {
            state.value -= 1
        },
        addTodo: (state,action) => {
            state.todo.push(action.payload)
        },
        delLastTodo: (state) => {
            state.todo.pop()
        }
    }
})

export const { incremented, decremented, addTodo, delLastTodo } = counterSlice.actions

export const store = configureStore({
    reducer: counterSlice.reducer
})

store.subscribe(() => console.log(store.getState()))