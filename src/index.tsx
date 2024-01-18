import React from 'react';
import {createRoot} from 'react-dom/client';  // yarn start berganimizda eng muhim narsa react-dom,
// bu  real-domni virtual-dom ga ulab beradigan package. hozir react-dom ni ichidan create dagan toolni olyabmiz
import {Provider} from 'react-redux';  //  Provider react-reduxni componenti, bizni componentlarni redux ga bog'lovchi component // ma'lumotlar bunkeri
import {store} from './app/store';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import './css/index.css';

import CssBaseline from '@mui/material/CssBaseline';
import {ThemeProvider} from '@mui/material/styles'; // themeProvider materila uni reactimizga integratsiya qilyabmiz
import theme from './app/MaterialTheme';  //mui css fream-work
import ReactDOM from "react-dom";

// const container = document.getElementById('root')!;
// document bu yerda real-dom hisoblanadi,

// real-domdan getElementById bilan o'zagina qo'lga olib, container nomi bilan saqlayabmiz
// const root = createRoot(container);
// bu yerda containerni react-dom package ni ichida paste qilyabmiz
// natijada yangi root berilyabdi. yangi root da ham real-dom ham virtual dom integratsiya qilinga

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                    <App/>
            </ThemeProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

//  Provider react-reduxni componenti, bizni componentlarni redux ga bog'lovchi component  // store reduxni storage hisoblanadi


// React ni tez ishlash sababi
// 1- virtual dom 2- barcha ma'lumotlar json formatda boradi

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();