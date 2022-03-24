import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Routes } from 'react-router-dom';

import Login from './Login';
import Dashboard from './Dashboard';
import Error from './ErrorPage';

export function App() {
    return (
        <div>
            <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/dashboard/:name" element={<Dashboard/>} />
            <Route path="*" element={<Error/>}/>
            <Route path="/error" element={<Error/>}/>
            </Routes>
        </div>
        
    );
}

export default App;