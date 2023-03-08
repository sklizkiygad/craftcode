import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./App";
import { store } from './redux/store'
import { Provider } from 'react-redux'
import {BrowserRouter, RouterProvider} from "react-router-dom";
import router from "./router/router";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <Provider store={store}>
        <RouterProvider router={router}>
     <App/>
        </RouterProvider>
    </Provider>

);


