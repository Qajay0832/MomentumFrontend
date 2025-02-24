import { configureStore } from "@reduxjs/toolkit";
import graphReducer from './redux/actions.jsx'


export default configureStore({
    reducer:{
        graph:graphReducer
    }
})