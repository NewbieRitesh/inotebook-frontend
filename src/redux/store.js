import { configureStore } from "@reduxjs/toolkit";
import darkModeReducer from "./reducer/darkModeReducer";

export default configureStore({
    reducer: darkModeReducer
})