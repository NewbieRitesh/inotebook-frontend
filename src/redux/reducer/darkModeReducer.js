import { createSlice } from "@reduxjs/toolkit";
export const darkModeReducer = createSlice({
    name: 'darkMode',
    initialState: {
        value: {
            type: 'light',
            bg: 'bg-body-secondary',
            text: 'text-dark',
        }
    },
    reducers: {
        darkMode: (state) => {
            state.value = {
                type: 'dark',
                bg: 'bg-dark',
                text: 'text-white'
            }
        },
        lightMode: (state) => {
            state.value = {
                type: 'light',
                bg: 'bg-body-secondary',
                text: 'text-dark'
            }
        },
    },
})

export const { darkMode, lightMode } = darkModeReducer.actions
export const modeStyle = (state) => state.value
export default darkModeReducer.reducer