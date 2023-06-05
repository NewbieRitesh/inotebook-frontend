import { createSlice } from "@reduxjs/toolkit";
const lightModeValue = {
    type: 'light',
    bg: 'bg-body-secondary',
    text: 'text-dark',
}
const darkModeValue = {
    type: 'dark',
    bg: 'bg-dark',
    text: 'text-white'
}
function getPreferredColorScheme() {
    const localStorageDarkMode = localStorage.getItem('darkMode')
    if (localStorageDarkMode === "true") return darkModeValue
    else if (localStorageDarkMode === "false") return lightModeValue
    if (window.matchMedia) {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            localStorage.setItem("darkMode", true)
            return darkModeValue;
        } else {
            localStorage.setItem("darkMode", false)
            return lightModeValue;
        }
    }
    return lightModeValue;
}
export const darkModeReducer = createSlice({
    name: 'darkMode',
    initialState: {
        value: getPreferredColorScheme()
    },
    reducers: {
        darkMode: (state) => {
            state.value = darkModeValue
        },
        lightMode: (state) => {
            state.value = lightModeValue
        },
    },
})

export const { darkMode, lightMode } = darkModeReducer.actions
export const modeStyle = (state) => state.value
export default darkModeReducer.reducer