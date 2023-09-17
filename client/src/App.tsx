import React from 'react';
import "./app.css";
import { Provider } from 'react-redux';
import store from './store/store';
import { Route, Routes, Navigate, HashRouter } from 'react-router-dom';
import { PaintPage } from './components/pages/PaintPage';

export function App() {

    return (
        <HashRouter>
            <Provider store={store}>
                <Routes>
                    <Route path='/' element={<Navigate to={`f${(+new Date()).toString(16)}`}/>}/>
                    <Route path='/:id' element={<PaintPage/>}/>
                </Routes>
            </Provider>
        </HashRouter>
       
    );
};
