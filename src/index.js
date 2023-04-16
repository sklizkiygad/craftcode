import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./App";
import { store } from './redux/store'
import { Provider } from 'react-redux'
import {BrowserRouter, HashRouter} from "react-router-dom";
import router from "./router/router";
import {RouterProvider} from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <Provider store={store}>
        <HashRouter router={router}>
     <App/>
        </HashRouter>
    </Provider>

);


